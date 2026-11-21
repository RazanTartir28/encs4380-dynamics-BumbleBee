# ENCS4380 – Dynamic Characteristics Interactive Toolkit

**Homework 1 – Interfacing Techniques**

## Live Website
https://razantartir28.github.io/encs4380-dynamics-BumbleBee/

## Project Overview
An interactive web-based toolkit developed for ENCS4380 – Interfacing Techniques at Birzeit University to demonstrate the dynamic characteristics of first-order sensors through simulations and visualizations.

## Module 1: First-Order Time Response
**Responsible Member:** Razan Tartir (1230922)

- Interactive step and ramp response simulations.
- Adjustable sensor gain (K) and time constant (τ).
- Response graphs and logarithmic error analysis.
- Prediction exercises and validation checks.
- https://razantartir28.github.io/encs4380-dynamics-BumbleBee/

## Module 2: First-Order Frequency Response
**Responsible Member:** Malak Rabee (1231479)

- Interactive sinusoidal frequency response simulation.
- Adjustable time constant (τ) and angular frequency (ω).
- Amplitude ratio, phase lag, cutoff frequency, and dynamic error calculations.
- Sine-wave and Bode plots.
- Dynamic error calculator, prediction activity, and validation checks.
**Live Demo:** https://razantartir28.github.io/encs4380-dynamics-BumbleBee/module2.html
  
## Module 3: Second-Order System Response

**Responsible Member:** Dana Abed Alfattah (1231169)

- Interactive mass-spring-damper system simulation.
- Adjustable mass (m), damping coefficient (b), and spring stiffness (k).
- Step response visualization with rise time, peak time, overshoot, and settling time.
- Visualization of system poles in the s-plane.
- State-space representation, eigenvalues, and phase-plane trajectory.
- Underdamped, critically damped, and overdamped response comparisons.
- Interactive prediction questions with immediate feedback.
- Validation checks for overshoot, critical damping, and eigenvalues.

 https://razantartir28.github.io/encs4380-dynamics-BumbleBee/module3.html

## Module 4 – Guess the Sensor Challenge
**Responsible Member:** Suad Jamal (1232045)
- Randomly generated hidden sensor parameters
- First-order step and sinusoidal responses
- Second-order step responses
- Noisy sensor measurements
- Parameter estimation and relative-error scoring
- Hints, answer reveal, and session score tracking
- https://razantartir28.github.io/encs4380-dynamics-BumbleBee/module4.html 

## Team Members
- Razan Tartir
- Malak Rabee
- Suad Jamal
- Dana Abed Alfattah

## Module Responsibilities
- Module 1: Razan Tartir (1230922)
- Module 2: Malak Rabee (1231479)
- Module 3: Dana Abed Alfattah (1231169)
- Module 4: Suad Jamal (1232045)

- ## Homework 2 — PID Control Toolkit

- 
# Homework 2 — PID Control Toolkit

**Team BumbleBee | ENCS4380 — Birzeit University**

### Project Status: Completed and Deployed

The PID Control Toolkit has been implemented and deployed using GitHub Pages. All four interactive modules (P1, P2, P3, and P4) are available through a unified navigation system.

**Live Website:** [Open Homework 2 — PID Control Toolkit](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/)

### Available Modules

- [P1 — PID Playground](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p1.html)
- [P2 — A Slow Sensor in the Loop](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p2.html)
- [P3 — Digital PID](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p3.html)
- [P4 — PID Tuning Challenge](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p4.html)

All modules provide interactive control-system simulations, response visualization, and educational activities to demonstrate PID controller behavior.

### P1 — PID Playground

**Owner:** Suad Jamal (1232045)

[Open P1](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p1.html)

- First-order and second-order plant selection.
- Adjustable PID gains and setpoint.
- Output and setpoint plot.
- Requested and applied control signals with limits.
- Live response metrics.
- Closed-loop block diagram.
- Predict, then check activity.
- P-only and PI validation checks.

### AI assistance

ChatGPT assisted with code development, explanations, debugging,
navigation styling and validation checks for P1.


## P2 — A Slow Sensor in the Loop

**Owner:** Malak Rabee (1231479)

[Open P2](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p2.html)

- Extended the PID Playground to include a first-order sensor model with an adjustable sensor time constant (τs).
- Implemented sensor-based feedback, where the PID controller uses the measured output instead of the true plant output.
- Added a sensor time constant slider (0–3 s) to demonstrate the effects of sensor delay.
- Displayed the true plant output, measured sensor output, and setpoint on the same live response graph.
- Supported both first-order and second-order plant models with adjustable PID gains and setpoint.
- Visualized requested and applied control signals with actuator limits.
- Displayed response metrics, including steady-state error estimate at 10 s, peak overshoot, rise time, and settling time.
- Added a closed-loop block diagram illustrating the sensor feedback path.
- Included an educational explanation of sensor delay, overshoot, and oscillations.
- Added a **Predict, then check** activity to compare expected and simulated sensor behavior.
- Validated the simulation using ideal-sensor, slow-sensor, and zero-controller test cases.
- Updated navigation to integrate P2 into the Control section.

### AI assistance

ChatGPT assisted with code development, sensor modeling, debugging, interface layout, response metric calculations, educational explanations, and simulation validation for P2.


### P3 — Digital PID

**Owner: Dana Abed Alfatah (1231169)**

[Open P3](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p3.html)

- Implemented a discrete-time PID controller with adjustable sampling time (Ts).
- Added interactive controls for Kp, Ki, Kd, and the setpoint.
- Simulated the plant using Euler integration and zero-order hold between controller updates.
- Displayed the output response and compared it with a baseline using Ts = 0.01 s.
- Visualized the stair-step control signal and actuator saturation limit.
- Added an anti-windup ON/OFF option using conditional integration.
- Displayed rise time, overshoot, settling time, and final error.
- Added a Predict, then check activity to explain the effect of increasing sampling time.

 AI assistance

 ChatGPT assisted with code development, discrete-time PID implementation, sampling time analysis, anti-windup logic, debugging, interface layout, response metric calculations, Arduino code generation, and simulation validation for P3.



## P4 — PID Tuning Challenge

**Owner: Razan Jamal Tartir (1230922)**

[Open P4](https://razantartir28.github.io/encs4380-dynamics-BumbleBee/control/p4.html)

- Implemented an interactive PID tuning challenge using a hidden, randomly generated first-order plant.
- Added adjustable proportional (Kp), integral (Ki), and derivative (Kd) controller gains.
- Simulated the closed-loop system using Euler numerical integration.
- Displayed the system output response and control signal using interactive Plotly graphs.
- Calculated performance metrics including overshoot, settling time, and steady-state error.
- Evaluated controller performance against the challenge requirements: overshoot ≤ 10% and steady-state error ≤ 1%, along with the settling-time limit.
- Implemented a performance scoring system to evaluate the selected PID gains.
- Added a "New Random Plant" button to generate a different plant for each challenge.
- Included a "Predict, then check" activity to help users understand the effect of PID tuning.
- Provided interactive feedback to help users improve controller performance.
- Generated Arduino PID loop code using the current controller settings, with a copy button.
- Tested P-only and PI controller validation cases.

   AI assistance
  ChatGPT assisted with code development, random plant generation, PID tuning logic, Euler-based simulation, debugging, interface styling, performance metric calculations, scoring system implementation, educational explanations, and validation checks for P4.



