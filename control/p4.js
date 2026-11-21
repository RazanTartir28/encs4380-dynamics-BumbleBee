'use strict';
// ENCS4380 Homework 2 — P4 Tuning Challenge. Self-contained, no backend.
const $ = id => document.getElementById(id);
const DT = 0.002, DURATION = 25, SETPOINT = 1, LIMIT = 10;
let plant, round = 0;
const random = (a,b) => a + Math.random() * (b-a);
function newChallenge(){
  // Reuse Homework 1 Module 4's hidden-random-plant challenge concept.
  plant = {K:random(0.65,1.5),tau:random(0.65,2.1)};
  round++;
  $('challengeNumber').textContent = `Challenge #${round} — hidden parameters`;
  $('settleLimit').textContent = '5.0';
  $('results').textContent = '';
  $('score').textContent = 'Score: —';
  $('status').textContent = 'New plant ready. Tune your controller and run the simulation.';
  // Keep Plotly's managed DOM intact; render the new challenge immediately.
  run();
}
function simulate(kp,ki,kd){
  let y=0, integral=0, previousY=0, u=0;
  const time=[],output=[],command=[];
  for(let i=0;i<=Math.round(DURATION/DT);i++){
    const t=i*DT, error=SETPOINT-y;
    const dyMeasured=(y-previousY)/DT;
    const candidate=integral+error*DT;
    const unsaturated=kp*error+ki*candidate-kd*dyMeasured;
    // Reject integration only when saturation and error would drive further into it.
    if(!((unsaturated>LIMIT&&error>0)||(unsaturated< -LIMIT&&error<0)))integral=candidate;
    u=Math.max(-LIMIT,Math.min(LIMIT,kp*error+ki*integral-kd*dyMeasured));
    time.push(t);output.push(y);command.push(u);
    previousY=y;
    y+=DT*(plant.K*u-y)/plant.tau;
    if(!Number.isFinite(y)||Math.abs(y)>1e6)break;
  }
  return {time,output,command};
}
function evaluate(s){
  const y=s.output,t=s.time,n=y.length;
  const finite=n===Math.round(DURATION/DT)+1 && y.every(Number.isFinite);
  const peak=Math.max(...y);
  const overshoot=Math.max(0,(peak-SETPOINT)/SETPOINT*100);
  let lastOutside=-1;
  for(let i=0;i<n;i++)if(Math.abs(y[i]-SETPOINT)>0.02*SETPOINT)lastOutside=i;
  const settling=finite&&lastOutside<n-1?t[Math.max(0,lastOutside+1)]:null;
  const tail=y.slice(Math.max(0,n-Math.round(1/DT)));
  const finalError=Math.abs(SETPOINT-tail.reduce((a,b)=>a+b,0)/tail.length)/SETPOINT*100;
  const stableTail=tail.every(v=>Math.abs(v-SETPOINT)<=0.02*SETPOINT);
  const pass=[finite&&overshoot<=10,finite&&settling!==null&&settling<=5,finite&&finalError<=1&&stableTail];
  return {overshoot,settling,finalError,pass,score:pass.reduce((sum,p,i)=>sum+(p?[40,35,25][i]:0),0)};
}
function metric(name,value,ok){return `<div class="metric"><strong>${name}</strong><div>${value}</div><div class="${ok?'pass':'fail'}">${ok?'✓ PASS':'✗ FAIL'}</div></div>`;}
function run(){
  const kp=+$('kp').value,ki=+$('ki').value,kd=+$('kd').value;
  const s=simulate(kp,ki,kd),m=evaluate(s);
  $('results').innerHTML=metric('Overshoot',`${m.overshoot.toFixed(2)}% (≤ 10%)`,m.pass[0])+metric('Settling time',`${m.settling===null?'Not settled':m.settling.toFixed(3)+' s'} (≤ 5 s)`,m.pass[1])+metric('Final error',`${m.finalError.toFixed(3)}% (≤ 1%)`,m.pass[2]);
  $('score').textContent=`Score: ${m.score} / 100`;
  $('status').textContent=m.pass.every(Boolean)?'Challenge passed! All specifications met.':'Not all specifications are met. Adjust gains and try again on the same hidden plant.';
  if(typeof Plotly==='undefined'){$('status').textContent+=' Plotly could not load; check your internet connection.';return;}
  const base={responsive:true,displaylogo:false};
  Plotly.react('responsePlot',[{x:s.time,y:s.output,name:'Plant output',mode:'lines',line:{color:'#047857'}},{x:[0,DURATION],y:[1,1],name:'Setpoint',mode:'lines',line:{dash:'dash',color:'#b45309'}},{x:[0,DURATION],y:[0.98,0.98],name:'−2% bound',mode:'lines',line:{dash:'dot',color:'#94a3b8'}},{x:[0,DURATION],y:[1.02,1.02],name:'+2% bound',mode:'lines',line:{dash:'dot',color:'#94a3b8'}}],{margin:{t:20,r:15,b:45,l:55},xaxis:{title:'Time (s)'},yaxis:{title:'Output'},legend:{orientation:'h'}},base);
  Plotly.react('controlPlot',[{x:s.time,y:s.command,name:'Applied u',mode:'lines',line:{color:'#0f766e'}},{x:[0,DURATION],y:[LIMIT,LIMIT],name:'+Limit',mode:'lines',line:{dash:'dash',color:'#b91c1c'}},{x:[0,DURATION],y:[-LIMIT,-LIMIT],name:'−Limit',mode:'lines',line:{dash:'dash',color:'#b91c1c'}}],{margin:{t:20,r:15,b:45,l:55},xaxis:{title:'Time (s)'},yaxis:{title:'Control signal u'},legend:{orientation:'h'}},base);
}
for(const id of ['kp','ki','kd']){$(id).addEventListener('input',()=>{$(id+'Value').textContent=(+$(id).value).toFixed(id==='kd'?2:1);});$(id+'Value').textContent=(+$(id).value).toFixed(id==='kd'?2:1);}
$('newPlant').addEventListener('click',newChallenge);
$('run').addEventListener('click',run);
$('check').addEventListener('click',()=>{$('predictionResult').textContent= $('prediction').value==='error'?'Correct. Integral action eliminates step steady-state error when the loop is stable, but excessive Ki may cause overshoot.':$('prediction').value?'Not quite. Ki accumulates error, reducing steady-state error, but aggressive integral action may cause overshoot.':'Choose a prediction first.';});
newChallenge();
