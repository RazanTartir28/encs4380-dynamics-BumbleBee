"use strict";
// Homework 2 P3: fixed-step Euler plant + sampled/held digital PID controller.
const $ = id => document.getElementById(id);
const BASE_DT = 0.002;  // Plant simulation step, independent of controller sampling time.
const settings = () => ({
  plant: $('plant').value, Ts: Number($('ts').value), Kp: Number($('kp').value),
  Ki: Number($('ki').value), Kd: Number($('kd').value), sp: Number($('sp').value),
  uMax: Number($('limit').value), duration: Number($('duration').value), anti: $('anti').checked
});
const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value));

function simulate(s) {
  let y=0, velocity=0, integral=0, previousError=0, u=0;
  const times=[0], ys=[0], controlTimes=[0], us=[0];
  const nSteps=Math.round(s.duration / BASE_DT);
  const stepsPerSample=Math.round(s.Ts / BASE_DT);
  for (let i=0;i<nSteps;i++) {
    // Read current plant output only at the discrete controller sample.
    if(i % stepsPerSample === 0) {
      const error=s.sp-y;
      const derivative = i===0 ? 0 : (error-previousError)/s.Ts;
      const candidateIntegral=integral+error*s.Ts;
      const rawCandidate=s.Kp*error+s.Ki*candidateIntegral+s.Kd*derivative;
      // Conditional integration: prevent further windup when saturated in
      // the direction of the current error; allow unwinding immediately.
      const blocksHigh=rawCandidate>s.uMax && error>0;
      const blocksLow=rawCandidate<0 && error<0;
      if(!s.anti || !(blocksHigh||blocksLow)) integral=candidateIntegral;
      const raw=s.Kp*error+s.Ki*integral+s.Kd*derivative;
      u=clamp(raw,0,s.uMax);
      previousError=error;
      controlTimes.push(i*BASE_DT); us.push(u);
    }
    // Zero-order hold: u remains unchanged between samples.
    if(s.plant==='first') y+=BASE_DT*(u-y); // K=1, tau=1
    else {
      const acceleration=u-velocity-y; // m=b=k=1
      y+=BASE_DT*velocity;
      velocity+=BASE_DT*acceleration;
    }
    times.push((i+1)*BASE_DT); ys.push(y);
  }
  controlTimes.push(s.duration);us.push(u);
  return {times,ys,controlTimes,us};
}
function metrics(trace,s) {
  const {times,ys}=trace, delta=s.sp;
  const first10=ys.findIndex(v=>v>=0.1*delta);
  const first90=ys.findIndex(v=>v>=0.9*delta);
  let lastOutside=-1;
  for(let i=0;i<ys.length;i++) if(Math.abs(ys[i]-s.sp)>0.02*Math.abs(delta)) lastOutside=i;
  const settle=lastOutside<ys.length-1 ? times[lastOutside+1] : null;
  const rise=first10>=0 && first90>=first10 ? times[first90]-times[first10] : null;
  const maxY=Math.max(...ys), over=Math.max(0,(maxY-s.sp)/Math.abs(delta)*100);
  const finalError=(s.sp-ys[ys.length-1])/s.sp*100;
  return {rise,settle,over,finalError};
}
function formatMetric(n,unit='s') {return n===null ? 'N/A (not reached)' : n.toFixed(2)+' '+unit;}
function plot(id,traces,title,yLabel) {
  if(typeof Plotly==='undefined') {$(id).textContent='Plotly could not load. Check your internet connection.'; return;}
  Plotly.react(id,traces,{
    height:370,margin:{l:66,r:25,t:70,b:55},legend:{orientation:'h',y:1.12},
    title:{text:title},xaxis:{title:'Time (s)'},yaxis:{title:yLabel}
  },{responsive:true,displaylogo:false});
}
function sketch(s) {
  const ms=Math.round(s.Ts*1000);
  return `// P3 Digital PID – generated from the current toolkit settings
// Normalize sensor output to the same units as the setpoint.
const float Kp = ${s.Kp.toFixed(3)}f;
const float Ki = ${s.Ki.toFixed(3)}f;
const float Kd = ${s.Kd.toFixed(3)}f;
const float setpoint = ${s.sp.toFixed(3)}f;
const float uMax = ${s.uMax.toFixed(3)}f;
const float Ts = ${s.Ts.toFixed(3)}f;  // seconds
const unsigned long sampleMs = ${ms}UL;
const bool antiWindup = ${s.anti ? 'true' : 'false'};
float integral = 0.0f;
float previousError = 0.0f;
bool firstSample = true;
unsigned long lastSample = 0;

float readOutput() {
  // TODO: Read your sensor/encoder and return scaled process output.
  return 0.0f;
}
void applyControl(float u) {
  // For a 0..1 normalized control, 255 PWM corresponds to 100% duty.
  // A motor driver may also require a separate direction pin.
  float normalized = constrain(u / uMax, 0.0f, 1.0f);
  analogWrite(9, (int)(normalized * 255.0f + 0.5f));
}
void setup() {
  pinMode(9, OUTPUT);
  lastSample = millis() - sampleMs;
}
void loop() {
  unsigned long now = millis();
  if ((unsigned long)(now - lastSample) < sampleMs) return;
  lastSample += sampleMs;
  float y = readOutput();
  float error = setpoint - y;
  float derivative = firstSample ? 0.0f : (error - previousError) / Ts;
  float candidateIntegral = integral + error * Ts;
  float candidateU = Kp * error + Ki * candidateIntegral + Kd * derivative;
  if (!antiWindup || !((candidateU > uMax && error > 0.0f) ||
                       (candidateU < 0.0f && error < 0.0f))) {
    integral = candidateIntegral;
  }
  float rawU = Kp * error + Ki * integral + Kd * derivative;
  float u = constrain(rawU, 0.0f, uMax);
  applyControl(u);
  previousError = error;
  firstSample = false;
}`;
}
function update() {
  const s=settings();
  ['kp','ki','kd','sp'].forEach(id=>$(id+'Out').textContent=Number($(id).value).toFixed(id==='kd'?2:1));
  $('tsOut').textContent=s.Ts.toFixed(2)+' s';
  const current=simulate(s), fast=simulate({...s,Ts:0.01});
  plot('responsePlot',[
    {x:current.times,y:current.ys,mode:'lines',name:`Output (Ts=${s.Ts}s)`,line:{width:3}},
    {x:fast.times,y:fast.ys,mode:'lines',name:'Reference output (Ts=0.01s)',line:{dash:'dash'}},
    {x:[0,s.duration],y:[s.sp,s.sp],mode:'lines',name:'Setpoint',line:{dash:'dot'}}
  ],'Digital closed-loop response','Output y');
  plot('controlPlot',[
    {x:current.controlTimes,y:current.us,mode:'lines',name:'Held control u[k]',line:{shape:'hv',width:2}},
    {x:[0,s.duration],y:[s.uMax,s.uMax],mode:'lines',name:'Upper limit',line:{dash:'dash'}}
  ],'Stair-step control (zero-order hold)','Control u');
  const m=metrics(current,s), mf=metrics(fast,s);
  $('metrics').innerHTML=`<p class="metric">Rise time (10–90%): <strong>${formatMetric(m.rise)}</strong> · 0.01 s baseline: ${formatMetric(mf.rise)}</p>
   <p class="metric">Overshoot: <strong>${m.over.toFixed(2)}%</strong> · baseline: ${mf.over.toFixed(2)}%</p>
   <p class="metric">Settling time (±2%): <strong>${formatMetric(m.settle)}</strong> · baseline: ${formatMetric(mf.settle)}</p>
   <p class="metric">Error at ${s.duration}s: <strong>${m.finalError.toFixed(2)}%</strong> · baseline: ${mf.finalError.toFixed(2)}%</p>`;
  $('arduino').textContent=sketch(s);
}
for(const id of ['plant','ts','kp','ki','kd','sp','limit','duration','anti'])
  $(id).addEventListener('input',update);
$('check').addEventListener('click',()=>{
  const value=$('prediction').value;
  $('predictionResult').textContent = !value?'Choose an answer first.':value==='coarse'?
  'Correct. Larger Ts means less frequent feedback updates and can create overshoot or instability. Compare the two output curves.':
  'Try again. A large Ts delays feedback updates; it does not make the plant faster or guarantee the same result.';
});
$('copy').addEventListener('click',async()=>{
  const value=$('arduino').textContent;
  try {await navigator.clipboard.writeText(value);$('copyStatus').textContent='Arduino code copied.';}
  catch(e){
    const range=document.createRange();range.selectNodeContents($('arduino'));
    const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
    $('copyStatus').textContent='Clipboard access blocked. Code selected: press Ctrl+C to copy.';
  }
});
update();
