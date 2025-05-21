import { Separator } from './ui/separator'
import type { Board } from '../types';
import List from './List';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBoardsStore } from './utils/boardsStore';
import { useListsStore } from './utils/listStore';
import { useState, useEffect } from 'react';
import SelectDemo from "./SelectColors";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import AddList from './AddList';
import BoardOptions from './BoardOptions';
import BoardWrapper from './BoardWrapper';

const Board = () => { 
    const { boardId } = useParams<{ boardId: string }>();
    const { boards, updateBoardColor } = useBoardsStore();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const board = boards.find((b) => b.id === boardId);
    const [bgColor, setBgColor] = useState<string>(board?.color || 'bg-gray-800');
    
    const lists = useListsStore(state => state.lists);
    const boardLists = lists.filter(list => list.boardId === boardId);


    useEffect(() => {
        if (board) {
            setBgColor(board.color);
        }
    }, [board]);

    const handleColorChange = (color: string) => {
        setBgColor(color);
        if (boardId) {
            updateBoardColor(boardId, color);
        }
    };


    if (!board) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-lg text-muted">Board not found.</p>
            </div>
        );
    }

return (
    <>
    <div className={`flex flex-col h-full w-dvw overflow-y-hidden`}>
        <div className="board-header h-22 flex items-center pl-4 gap-4 text-lg text-muted">
            <h2 className='h-auto w-auto rounded-2xl hover:bg-muted-foreground p-2'>{board.title}</h2>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                            <button className={`rounded-lg px-4 py-2 ${bgColor}`}>
                                Color de tablero
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                            <SelectDemo onColorChange={handleColorChange}/>
                        </PopoverContent>
                    </Popover>

        </div>
        <Separator/>
        <div className={`board-content flex flex-nowrap text-muted overflow-x-auto h-full max-h-[calc(100vh-80px)] ${bgColor}`}>
            {boardLists.map((list) => (
                <List key={`list-${list.id}`} list={list} boardName={board.title}></List>
            ))}
                
        <div className='min-w-52 h-fit bg-muted-foreground rounded-2xl flex justify-between text-muted p-2 m-2'>
            <BoardWrapper id='add-list'>
            <h3>Añadir Lista</h3>
                <BoardOptions>
                    <AddList boardId={boardId ?? ''}> 
                        <Plus/>
                    </AddList>
                </BoardOptions>
            </BoardWrapper>
        </div>

        </div>
    </div>
    </>
);
}

export default Board;