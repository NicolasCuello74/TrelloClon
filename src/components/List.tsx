import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import type { List as ListType, Task as TaskType } from "../types";
import Task from "./Task";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useEffect, useState } from "react";
import { useListsStore } from "./utils/listStore";

type Props = {
  list: ListType;
  boardName: string;
};

const List = ({ list, boardName }: Props) => {
  const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, TaskType>([], { group: boardName });
  const [editTitleList, setEditTitleList] = useState<boolean>(false);
  const [nameList, setNameList] = useState<string>(list?.title || '');
  const { updateList } = useListsStore();

  // Función para actualizar el título de la lista
  const handleListTitleChange = () => {
    if (!nameList.trim()) { 
      setNameList(list?.title || "List Name"); // Restaura el título anterior o establece uno predeterminado
      return;
    }
    if (list.id) {  // Aquí corregimos el uso de listId
      const updatedList = { ...list, title: nameList };
      updateList(list.id, updatedList);
    }
    setEditTitleList(false);
  };

  useEffect(() => {
    setTodos(list.tasks);
  }, [list.tasks, setTodos]);

  return (
    <div className="list flex flex-col h-fit min-w-52 max-w-52 border-2 border-gray-300 rounded-2xl p-2 m-2 gap-2">
      <div className="flex flex-col gap-1 wrap-break-word">
        {editTitleList ? (
          <textarea
            className="text-sm cursor-pointer overflow-hidden resize-none"
            value={nameList}
            onChange={(e) => setNameList(e.target.value)}
            onBlur={handleListTitleChange}
            autoFocus
          />
        ) : (
          <h3 className="text-sm cursor-pointer" onClick={() => setEditTitleList(true)}>
            {list.title}
          </h3>
        )}
        <Separator />
        <div ref={todoList} id={`list-tasks-${list.id}`} className="flex flex-col gap-2 pt-2">
          {todos.map((task) => (
            <Task key={task.id} task={task} aria-describedby={`task-${task.id}`} />
          ))}
        </div>
      </div>
      <div className="gap-2">
        <BoardWrapper id={`options-list-${list.id}`}>
          <h4>Añadir Tarjeta</h4>
          <BoardOptions>
            <Plus />
          </BoardOptions>
        </BoardWrapper>
      </div>
    </div>
  );
};

export default List;