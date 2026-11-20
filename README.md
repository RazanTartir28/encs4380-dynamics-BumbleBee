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
- Generated Arduino PID loop code using the current controller settings, with a copy button.
- Tested P-only and PI controller validation cases.



