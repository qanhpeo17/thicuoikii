import React, { useState, useEffect } from "react";
import "../component/TODOAPP.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks !== null) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = { id: Date.now(), text: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const filterTasks = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div>
      <div className="title">
        <h1>#Todo</h1>
      </div>
      <div className="btnWrapper">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => filterTasks("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? "active" : ""}
          onClick={() => filterTasks("Active")}
        >
          Active
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => filterTasks("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="inputWrapper">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="add details"
        />
        <button className="addtaskBtn" onClick={addTask}>
          Add Task
        </button>
      </div>

      {filteredTasks.map((task) => (
        <div className="taskList" key={task.id}>
          <div className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />

            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </div>
          <button className="deleteBtn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
      <div className="deleteallBtnWrapper">
        <button className="deleteallBtn" onClick={deleteAllTasks}>
          Delete All
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
