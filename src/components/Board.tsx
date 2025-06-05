import { Separator } from './ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import type { Board } from '../types';
import List from './List';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBoardsStore } from './utils/boardsStore';
import { useListsStore } from './utils/listStore';
import { useState, useEffect, useMemo } from 'react';
import SelectDemo from "./SelectColors";
import AddList from './AddList';
import BoardOptions from './BoardOptions';
import BoardWrapper from './BoardWrapper';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { animations } from '@formkit/drag-and-drop';
import { List as ListType } from '../types';

const Board = () => {
    const { boardId } = useParams<{ boardId: string }>();
    const { boards, updateBoard, updateBoardColor } = useBoardsStore();
    const { lists } = useListsStore()
    
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const board = boards.find((b) => b.id === boardId);
    
    const [bgColor, setBgColor] = useState<string>(board?.color || 'bg-gray-800');
    const [editTitleBoard, setEditTitleBoard] = useState<boolean>(false);
    
    const [nameBoard, setNameBoard] = useState<string>(board?.title || 'Board Name');
    
    const boardLists = useMemo(
        () => Array.isArray(lists) ? lists.filter(list => list.boardId === boardId) : [],
        [lists, boardId]
    );
    
    
    const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, ListType>(
        boardLists,
        {
            group: boardId,
            plugins: [animations()],
        });
        
        const handleColorChange = (color: string) => {
            setBgColor(color);
            if (boardId) {
                updateBoardColor(boardId, color);
            }
        };
        
        const handleTitleChange = () => {
            if (!nameBoard.trim()) {
                setNameBoard(board?.title || "Board Name"); // Restaura el título anterior o establece uno predeterminado
                return;
            }
            if (boardId && board) {
                const updatedBoard = { ...board, title: nameBoard };
                updateBoard(boardId, updatedBoard);
            }
            setEditTitleBoard(false);
        };
        
        useEffect(() => {
            if (board) {
            setBgColor(board.color);
            setNameBoard(board.title)
        }
        // Actualiza el estado de los todos si la lista de listas del tablero cambia
            if (todos.length !== boardLists.length) {
                setTodos(boardLists);
            }
    }, [board, boardLists, boardId, setTodos, todos]);
    
    if (!board) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-lg text-muted">Tablero no encontrado</p>
            </div>
        );
    }
    
    return (
        <>
    <div className={`flex flex-col h-full w-dvw overflow-y-hidden`}>
        <div className="board-header h-22 flex items-center pl-4 gap-4 text-lg text-muted">
            {editTitleBoard ? (
                <input
                    type="text"
                    className='w-auto h-10 bg-transparent border-b-2 border-amber-50 focus:outline-none focus:border-amber-50 text-lg'
                    value={nameBoard}
                    onChange={(e)=> setNameBoard(e.target.value)}
                    onBlur={handleTitleChange}
                    autoFocus/>
                ) : (
            <h2 className='h-auto w-auto rounded-2xl hover:bg-muted-foreground p-2' onClick={() => setEditTitleBoard(true)}>
                {nameBoard ? nameBoard : "Board Name"}
            </h2>
                )}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger className='rounded-lg px-4 py-2 border-2 border-amber-50 hover:bg-muted-foreground transition-colors duration-200'>
                        Color de tablero
                </PopoverTrigger>
                <PopoverContent className="w-64 flex gap-2 justify-between items-center">
                    <SelectDemo onColorChange={handleColorChange}/>
                    <Button className='rounded-lg px-4 py-2 hover:bg-muted-foreground hover:text-amber-50 transition-colors duration-200' onClick={() => setIsPopoverOpen(false)}>
                        X
                    </Button>
                </PopoverContent>
            </Popover>
        </div>

        <Separator/>

        <div className={`board-content flex flex-nowrap text-muted overflow-x-auto h-full max-h-[calc(100vh-80px)] ${bgColor}`}>
            <div ref={todoList} className='flex flex-nowrap'>
                {todos.map((todo) => (
                    <List key={todo.id} list={todo} boardName={todo.title} />
                ))}
            </div>

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