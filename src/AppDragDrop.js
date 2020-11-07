import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./styles.css";

export default function AppDragDrop() {
  const [state, setState] = useState({
    tasks: [
      { id:"todo-1"+nanoid(),name: "Hit the gym", category: "todo", bgcolor: "#FFB695" },
      { id:"todo-2"+nanoid(),name: "Get breakfast", category: "todo", bgcolor: "#96D1CD" }
    ]
  });

  // const [newTodo, setNewTodo] = useState('');
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTodo = (id) => {
    const remainingTasks = state.tasks.filter(x => x.id!==id)
    setState({tasks: [...remainingTasks]});
  }

  const onDragStart = (e, id) => {
    console.log("dragstart:", id);
    e.dataTransfer.setData("id", id);
  };

  const onDrop = (e, cat) => {
    let id = e.dataTransfer.getData("id");

    let newTasks = state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
        task.bgcolor = task.bgcolor==="#FFB695"?"#96D1CD":"#FFB695";
      }
      return task;
    });

    // let oldTasks = [...state.tasks];
    setState({ tasks: [...newTasks] });
  };

  var tasks = {
    todo: [],
    done: []
  };

  // console.log(state);
  if (state.tasks) {
    state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div
          key={t.id}
          onDragStart={(e) => onDragStart(e, t.name)}
          className="draggable"
          draggable
          style={{ backgroundColor: t.bgcolor }}
        >
           <button className="close" onClick={()=>deleteTodo(t.id)}>&#10006;</button>
          {t.name}
        </div>
      );
    });
  }
  return (
    <div className="container-drag">
      <h2 className="header">Task Manager</h2>
      <input onKeyPress={(e)=>{if(e.key==="Enter" && e.target.value){let newTasks = [...state.tasks, { id:"todo-"+Math.random()+nanoid(), name: e.target.value, category: "todo", bgcolor: "#FFB695" }];setState({tasks:newTasks});e.target.value = ""}}}/>
      <div
        className="todo"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          onDrop(e, "todo");
        }}
      >
        <span className="task-header" onClick={(e)=>{console.log(e.target.childNodes[0].data)}}>Tasks List</span>
        {tasks.todo}
      </div>
      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "done")}
      >
        <span className="task-header">Tasks Done</span>
        {tasks.done}
      </div>
    </div>
  );
}


//  <input onKeyPress={(e)=>{if(e.key==="Enter"){let newTasks = [...state.tasks, { id:"todo-"+nanoid(), name: e.target.value, category: "todo", bgcolor: "#FFB695" }];setState({tasks:newTasks});e.target.value = ""}}}/>
/*
 <button onClick={()=>{
  let filteredTasks = () => {}
 }}>X</button>
 
*/