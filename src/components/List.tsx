import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Plus, X } from "lucide-react";
import { Separator } from "./ui/separator";
import type { List as ListType, Task as TaskType } from "../types";
import Task from "./Task";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useEffect, useState } from "react";
import { useListsStore } from "./utils/listStore";
import DeleteList from "./DeleteList";
import AddTask from "./AddTask";
import { useTasksStore } from "./utils/tasksStore";


type Props = {
  list: ListType;
  boardName: string;
};

const List = ({ list, boardName }: Props) => {
  const { updateList } = useListsStore();
  const { tasks } = useTasksStore();
  const [editTitleList, setEditTitleList] = useState<boolean>(false);
  const [nameList, setNameList] = useState<string>(list?.title || '');  
  const taskFilter = tasks.filter(task => task.listId  === list.id);
  
  const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, TaskType>(
    taskFilter, 
    { group: boardName }
  );


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
    if (list) {
      setNameList(list.title);
    }
    if (todos.length !== taskFilter.length) {
      setTodos(taskFilter);
    }
  }, [list, todos, setTodos, taskFilter]);

  return (
    <div className={`list-${list.id} flex flex-col h-fit min-w-52 max-w-52 border-2 border-gray-300 rounded-2xl p-2 m-2 gap-2 bg-accent-foreground`}>
      <div className="w-full flex flex-col gap-1 wrap-break-word">
        <div className="flex items-start">
          {editTitleList ? (
            <textarea
              className="min-w-4/5 max-w-4/5 h-auto text-sm cursor-pointer overflow-hidden resize-none"
              value={nameList}
              onChange={(e) => {
              setNameList(e.target.value);
              e.target.style.height = "auto"; // Restablecer altura
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajustar altura según contenido
              }}
              onFocus={(e) => {
              e.target.style.height = "auto"; // Restablece altura al enfocarse
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta según el contenido actual
              }}
              onBlur={handleListTitleChange}
              autoFocus
            />
          ) : (
            <h3 className="min-w-4/5 max-w-4/5 h-auto text-sm cursor-pointer overflow-hidden resize-none" onClick={() => setEditTitleList(true)}>
              {list.title}
            </h3>
          )}
          <BoardWrapper id={`options-list-${list.id}`}>
            <BoardOptions>
              <DeleteList listId={list.id}>       
                <X size={20}/>
              </DeleteList>
            </BoardOptions>
          </BoardWrapper>
        </div>
        <Separator />
        <div ref={todoList} id={`list-tasks-${list.id}`} className="flex flex-col gap-2 pt-2">
          {todos.map((task) => (
            <Task key={task.id} task={task} listId={list.id} aria-describedby={`task-${task.id}`} />
          ))}
        </div>
      </div>
      <div className="max-w-52 hover:bg-muted-foreground rounded-lg flex text-muted">
        <BoardWrapper id='add-task'>
          <BoardOptions>
            <AddTask listId={list.id} boardId={list.boardId}>
              <Plus />
            </AddTask>
          </BoardOptions>
          <h3>Añade una Tarea</h3>
        </BoardWrapper>
      </div>
    </div>
  );
};

export default List;

