import React, { useReducer, useState } from "react";
import "./Counter.css";
import { Button } from "antd";

const Counter = ({current, setCurrent, markStepCompleted}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { num: state.num + 1 };

      case "decrement":
        return {
          num: state.num - 1,
        };

      default:
        return {
          num: 0,
        };
    }
  };
  
  const [state, dispatch] = useReducer(reducer, { num: 0 });

  // Mark step as completed when user interacts with counter
  const handleCounterAction = (actionType) => {
    dispatch({ type: actionType });
    if (!hasInteracted) {
      setHasInteracted(true);
      markStepCompleted(current);
    }
  };

  return (
    <>
      <div className="counter">
        <div className="heading">Counter Task</div>
        <br />
        <div className="number">
          <p>
            <strong>{state.num}</strong>
          </p>
        </div>
        <br />
        <div className="button">
          <Button
            className="butn"
            onClick={() => handleCounterAction("increment")}
          >
            Increment
          </Button>
          <Button
            className="butn"
            onClick={() => handleCounterAction("decrement")}
          >
            Decrement
          </Button>
          <Button className="butn" onClick={() => handleCounterAction("reset")}>
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};

export default Counter;
