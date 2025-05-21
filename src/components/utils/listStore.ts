import { create } from 'zustand';
import { List as ListType } from '@/types';

type ListsStore = {
    lists: ListType[];
    addList: (list: ListType) => void;
    removeList: (listId: string) => void;
    updateList: (listId: string, updatedList: ListType) => void;
};

export const useListsStore = create<ListsStore>((set) => ({
    lists: JSON.parse(localStorage.getItem('lists') || '[]') as ListType[],

    addList: (list) => set(({ lists }) => {
        const updatedLists = [...lists, list];
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        return { lists: updatedLists };
    }),

    removeList: (listId) => set(({ lists }) => {
        const updatedLists = lists.filter(list => list.id !== listId);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        return { lists: updatedLists };
    }),

    updateList: (listId, updatedList) => set(({ lists }) => {
        const updatedLists = lists.map(list =>
            list.id === listId ? updatedList : list
        );
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        return { lists: updatedLists };
    })
}));