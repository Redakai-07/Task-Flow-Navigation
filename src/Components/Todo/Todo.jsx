import React, { useState } from "react";
import './Todo.css';


const Todo = ({current, setCurrent, markStepCompleted}) => {

  const [isEdit,setIsEdit]=useState(null);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [update,setUpdate] =useState("");
  const [hasCompleted, setHasCompleted] = useState(false);

  const addTask = () => {
    if(input.trim()!=="") {
      setTasks([...tasks, input]);
      setInput("");
      
      // Mark step as completed when first task is added
      if (!hasCompleted) {
        setHasCompleted(true);
        markStepCompleted(current);
      }
    }
  };

  const saveEdit=(ind)=>{
    // const finalArray=[...tasks];
    // finalArray[ind]=update;

    const finalArray=tasks.with(ind,update);
    setIsEdit(false);
    setTasks(finalArray);
  };

  const editTask=(ind,val)=>{
    setIsEdit(ind);
    setUpdate(val);
  };

const cancelEdit=()=>{
  setIsEdit(false);
};

  const removeTask = (ind) => {
    const finalArray = [...tasks];
    finalArray.splice(ind, 1);
    console.log(finalArray);
    setTasks(finalArray);
  };
 
  return (
    <div className="todo">
      <div className="heading">Todo Task</div>
      <div className="todoContainer">
        <div className="input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="list">
          <ul>
            {tasks.map((val, ind) => (
              
              <li key={ind}>
  {isEdit === ind ? (
    <div className="task-update">
      <input
        type="text"
        value={update}
        onChange={(e) => setUpdate(e.target.value)}
      />
      <button onClick={() => saveEdit(ind)}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  ) : (
    <div className="task-item">
      <span className="task-text">{val}</span>
      <div className="task-update-buttons">
        <button onClick={() => editTask(ind, val)}>Edit</button>
        <button onClick={() => removeTask(ind)}>X</button>
      </div>
    </div>
  )}
</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
