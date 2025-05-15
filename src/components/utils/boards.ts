import { create } from 'zustand';
import { Board as BoardType } from '@/types';

type BoardsStore = {
    boards: BoardType[];
    addBoard: (board: BoardType) => void;
};

export const useBoardsStore = create<BoardsStore>((set) => ({
        boards: JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[],
        addBoard: (board) => set(({ boards }) => {
            const boardsLocalStorage = JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[];
            boardsLocalStorage.push(board);
            localStorage.setItem('boards', JSON.stringify(boardsLocalStorage));
            return { boards: [...boards, board] };
        }),
    }));