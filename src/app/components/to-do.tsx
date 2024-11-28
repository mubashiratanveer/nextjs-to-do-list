"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      className="bg-cover bg-center h-screen items-center p-4 flex flex-col "
      style={{ backgroundImage: "url('background.png')" }}
    >
      <h1 className="font-bold text-4xl mb-4 ">TO-DO List</h1>
      <div className="w-full max-w-md mb-4 flex ">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded border-2 border-black bg-transparent placeholder-sky-300  "
        />
        <button
          onClick={handleAddTask}
          className="ml-2 p-2 rounded bg-gradient-to-r from-blue-500 to-teal-500
            hover:from-blue-600 hover: to-teal-600"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md ">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between p-2 mb-2 border-b border-gray-300 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{task.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className={`p-1 ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : " rounded bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover: to-teal-600"
                }`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 rounded bg-gradient-to-r from-red-500 to-pink-500
            hover:from-red-600 hover: to-pink-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
