import React, { useState } from "react";
import { Button, Steps, message } from "antd";
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

  return (
    <div className="container">
      <div className="steps">
        <Steps
          wrapperCol={{
            span: 24,
          }}
          labelCol={{
            span:24,
          }}
          className="site-navigation-steps"
          responsive={true}
          size="small"
          current={current}
          onChange={handleStepChange}
          items={[
            { 
              title: "Registration",
              status: completedSteps.includes(0) ? "finish" : current === 0 ? "process" : "wait"
            },
            { 
              title: "Login",
              status: completedSteps.includes(1) ? "finish" : current === 1 ? "process" : "wait"
            },
            { 
              title: "Mobile",
              status: completedSteps.includes(2) ? "finish" : current === 2 ? "process" : "wait"
            },
            { 
              title: "Otp",
              status: completedSteps.includes(3) ? "finish" : current === 3 ? "process" : "wait"
            },
            { 
              title: "Pagination",
              status: completedSteps.includes(4) ? "finish" : current === 4 ? "process" : "wait"
            },
            { 
              title: "Counter",
              status: completedSteps.includes(5) ? "finish" : current === 5 ? "process" : "wait"
            },
            { 
              title: "To Do List",
              status: completedSteps.includes(6) ? "finish" : current === 6 ? "process" : "wait"
            },
            { 
              title: "Success",
              status: completedSteps.includes(7) ? "finish" : current === 7 ? "process" : "wait"
            },
          ]}
        />
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
