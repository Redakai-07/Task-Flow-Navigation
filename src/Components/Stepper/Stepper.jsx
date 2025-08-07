import React, { useState } from "react";
import { Button, message } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { completeStep } from '../../slice';

import Login from "../Login/Login";
import Mobile from "../MobileNumber/Mobile";
import Otp from "../Otp/Otp";
import Paginations from "../Paginations/Paginations";
import Counter from "../Counter/Counter";
import Todo from "../Todo/Todo";
import Success from "../Success/Success";
import UserForm from "../UserForm/UserForm";
import "./Stepper.css";

const Stepper = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { completedSteps } = useSelector(state => state.users);

  const clicks = () =>{
    setCurrent(current+1);
  };

  // Function to check if a step can be accessed
  const canAccessStep = (stepIndex) => {
    // Always allow going back to previous steps
    if (stepIndex <= current) {
      return true;
    }
    
    // For future steps, check if all previous steps are completed
    for (let i = 0; i < stepIndex; i++) {
      if (!completedSteps.includes(i)) {
        return false;
      }
    }
    return true;
  };

  // Handle step change with validation
  const handleStepChange = (value) => {
    if (canAccessStep(value)) {
      setCurrent(value);
    } else {
      message.warning('Please complete the current step before proceeding to the next one.');
    }
  };

  // Function to mark current step as completed
  const markStepCompleted = (stepIndex) => {
    dispatch(completeStep(stepIndex));
  };

  const steps = [
    { title: "Registration", index: 0 },
    { title: "Login", index: 1 },
    { title: "Mobile", index: 2 },
    { title: "Otp", index: 3 },
    { title: "Pagination", index: 4 },
    { title: "Counter", index: 5 },
    { title: "To Do List", index: 6 },
    { title: "Success", index: 7 }
  ];

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      return "completed";
    } else if (current === stepIndex) {
      return "current";
    } else {
      return "waiting";
    }
  };

  return (
    <div className="container">
      <div className="steps">
        <div className="site-navigation-steps">
          <div className="custom-steps">
            {steps.map((step, index) => {
              const status = getStepStatus(step.index);
              const isClickable = canAccessStep(step.index);
              
              return (
                <div 
                  key={step.index}
                  className={`custom-step-item ${status} ${isClickable ? 'clickable' : ''}`}
                  onClick={() => isClickable && handleStepChange(step.index)}
                >
                  <div className="step-icon">
                    {status === "completed" ? (
                      <span className="step-number completed">✓</span>
                    ) : (
                      <span className={`step-number ${status}`}>{step.index + 1}</span>
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`step-connector ${status}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="components">
        {current === 0 && <UserForm current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 1 && <Login current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 2 && <Mobile current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 3 && <Otp current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 4 && <Paginations current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 5 && <Counter current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 6 && <Todo current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
        {current === 7 && <Success current={current} setCurrent={setCurrent} markStepCompleted={markStepCompleted} />}
      </div>
      <div className="buttons">
        {current > 3 && current < 7 && <Button className="butn" onClick={clicks} block type="primary">Next Part</Button>} 
      </div>
    </div>
  );
};

export default Stepper;
