import { Task as TaskType } from "../types";
import { useState , useEffect } from "react";
import { useTasksStore } from "./utils/tasksStore";

type Props = {
    task: TaskType;
    listId: string; // Aseguramos que listId se obtiene correctamente
};

const Task = ({ task, listId }: Props) => {
    const [editTitleTask, setEditTitleTask] = useState<boolean>(false);
    const [nameTask, setNameTask] = useState<string>(task?.title || '');
    const { updateTask } = useTasksStore();

    const handleTaskTitleChange = () => {
    if (!nameTask.trim()) { 
      setNameTask(task?.title || "Task Name"); // Restaura el título anterior o establece uno predeterminado
      return;
    }
    if (task.id) {  // Aquí corregimos el uso de listId
      const updatedList = { ...task, title: nameTask };
      updateTask(task.id, updatedList);
    }
    setEditTitleTask(false);
  };

  useEffect(() => {
      if (task.title) {
        setNameTask(task.title);
      }

    }, [task, setNameTask]);
    return (
        <div
            key={task.id}
            data-id={task.id} // Asegura que FormKit puede identificarlo
            data-list-id={listId} // Asegura que FormKit puede identificar la lista
            className="bg-gray-600 p-2 rounded-md border-2 border-transparent hover:border-white duration-200 cursor-move"
        >
            {editTitleTask ? (
            <textarea
              className="min-w-4/5 max-w-4/5 h-auto text-sm cursor-pointer overflow-hidden resize-none"
              value={nameTask}
              onChange={(e) => {
              setNameTask(e.target.value);
              e.target.style.height = "auto"; // Restablecer altura
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajustar altura según contenido
              }}
              onFocus={(e) => {
              e.target.style.height = "auto"; // Restablece altura al enfocarse
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta según el contenido actual
              }}
              onBlur={handleTaskTitleChange}
              autoFocus
            />
          ) : (
            <h3 className="min-w-4/5 max-w-4/5 h-auto text-sm cursor-pointer overflow-hidden resize-none" onClick={() => setEditTitleTask(true)}>
              {task.title}
            </h3>
          )}
        </div>
    );
};

export default Task;