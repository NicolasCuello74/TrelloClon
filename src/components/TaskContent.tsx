import { useState } from "react";
import TaskList from "./components/TaskList.tsx";

function Content() {
    const [taskLists, setTaskLists] = useState([
      { id: 1, title: "To Do", tasks: ["Task 1", "Task 2"] },
      { id: 2, title: "In Progress", tasks: ["Task 3"] },
      { id: 3, title: "Done", tasks: ["Task 4"] },
    ]);

    const addTask = (listId: number, task: string) => {
      setTaskLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, tasks: [...list.tasks, task] }
            : list
        )
      );
    };

    const moveTask = (fromListId: number, toListId: number, task: string) => {
      setTaskLists((prev) => {
        const updatedLists = prev.map((list) => {
          if (list.id === fromListId) {
            return { ...list, tasks: list.tasks.filter((t) => t !== task) };
          }
          if (list.id === toListId) {
            return { ...list, tasks: [...list.tasks, task] };
          }
          return list;
        });
        return updatedLists;
      });
    };

    return (
      <div className="flex gap-4 p-4 overflow-x-auto">
        {taskLists.map((list) => (
          <TaskList
            key={list.id}
            list={list}
            addTask={addTask}
            moveTask={moveTask}
          />
        ))}
      </div>
    );
  }

  export default Content;