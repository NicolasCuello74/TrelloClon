import React, { useState } from "react";

type TaskListProps = {
  id: number;
    title: string;
    tasks: string[];
};
type TaskListComponentProps = {
  list: TaskListProps;
  addTask: (listId: number, task: string) => void;
  moveTask: (fromListId: number, toListId: number, task: string) => void;
};


const TaskList = ({ list, addTask, moveTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(list.id, newTask);
      setNewTask("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md w-64">
      <h2 className="text-lg font-bold mb-2">{list.title}</h2>
      <ul className="mb-4">
        {list.tasks.map((task) => (
          <li key={task} className="flex justify-between items-center mb-2">
            <span>{task}</span>
            <button
              onClick={() => moveTask(list.id, list.id === 1 ? 2 : 1, task)}
              className="text-blue-500 hover:underline"
            >
              Move
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        className="border p-1 rounded w-full mb-2"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white py-1 px-4 rounded"
      >
        Add Task
      </button>
    </div>
  );
}