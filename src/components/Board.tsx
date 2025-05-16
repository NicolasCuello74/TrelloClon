import { Separator } from './ui/separator'
import { Button} from './ui/button';
import type { Board } from '../types';
import List from './List';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBoardsStore } from './utils/boards';
import { log } from 'console';


const Board = () => { 
    const { boardId } = useParams<{ boardId: string }>();
    const board = useBoardsStore((state) => state.boards).find((board) => board.id === boardId);
    
    if (!board) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-lg text-muted">Board not found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="board-header h-22 flex items-center pl-4 gap-4 text-lg text-muted">
                <h2 className='h-auto w-auto rounded-2xl hover:bg-muted-foreground p-2'>{board.title}</h2>
                <Button/>
            </div>
            <Separator/>
            <div className="board-content flex flex-nowrap text-muted overflow-x-auto h-full max-h-[calc(100vh-80px)]">
                {board.list.map((list) => (
                    <List key={`list-${list.id}`} list={list} boardName={board.title}></List>
                ))}
                
                <div id='add-list' className='min-w-52 h-fit bg-muted-foreground rounded-2xl flex items-center justify-between text-muted hover:bg-gray-600 p-2 m-2'>
                   <h3>Anadir Lista</h3>
                   <Plus/> 
                </div>
            </div>
        </>
    );
    }

    export default Board;