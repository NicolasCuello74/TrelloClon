import BoardWrapper from './BoardWrapper';
import BoardOptions from './BoardOptions';
import { Plus } from 'lucide-react';
import { Separator } from './ui/separator';
import type { List as ListType, Task as TaskType } from '../types';
import Task from './Task';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';

type Props = {
    list: ListType,
    boardName: string,
}

const List = ({ list, boardName }: Props) => {
    const [todoList, todos] = useDragAndDrop<HTMLDivElement, TaskType>(
        list.tasks,
        {group: boardName}
    );

    return (
        <>
        <div key={list.id} className="list h-fit flex flex-col min-w-52 border-2 border-gray-300 rounded-2xl p-2 m-2 gap-2">
                        <div className='flex flex-col gap-1'>
                            <h3 className="text-lg font-semibold">{list.title}</h3>
                            <Separator/>
                            <div ref={todoList} id={`list-tasks-${list.id}`} className='flex flex-col gap-2 pt-2'>
                                {todos.map((task) => (
                                    <Task key={task.id} task={task}/>
                                ))}
                            </div>
                        </div>
                        <div className="gap-2">
                        <BoardWrapper id={`options-list-${list.id}`}>
                                <h4>Anadir Tarjeta</h4>
                                <BoardOptions>
                                    <Plus/>
                                </BoardOptions>
                        </BoardWrapper>
                        </div>
                    </div>
        </>
    );
    }

export default List;