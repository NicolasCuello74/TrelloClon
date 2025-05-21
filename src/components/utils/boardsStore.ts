import { create } from 'zustand';
import { Board as BoardType } from '@/types';

type BoardsStore = {
    boards: BoardType[];
    addBoard: (board: BoardType) => void;
    removeBoard: (boardId: string) => void;
    updateBoard: (boardId: string, updatedBoard: BoardType) => void;
    updateBoardColor: (id: string, color: string) => void;
};

export const useBoardsStore = create<BoardsStore>((set) => ({
        boards: JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[],

        addBoard: (board) => set(({ boards }) => {
            const boardsLocalStorage = JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[];
            boardsLocalStorage.push(board);
            localStorage.setItem('boards', JSON.stringify(boardsLocalStorage));
            return { boards: [...boards, board] };
        }),

        removeBoard: (boardId) => set(() => {
            const boardsLocalStorage = JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[];
            const updatedBoards = boardsLocalStorage.filter((board) => board.id !== boardId);
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            return { boards: updatedBoards };
        }),
        
        updateBoard: (boardId, updatedBoard) => set(() => {
            const boardsLocalStorage = JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[];
            const updatedBoards = boardsLocalStorage.map((board) => (board.id === boardId ? updatedBoard : board));
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            return { boards: updatedBoards };
        }),
        
        updateBoardColor: (id: string, color: string) => set(({ boards }) => {
        const updatedBoards = boards.map(board =>
            board.id === id ? { ...board, color } : board
        );
        localStorage.setItem('boards', JSON.stringify(updatedBoards));
        return { boards: updatedBoards };
        })

    }));