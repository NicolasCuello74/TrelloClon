export type Board = {
    id: string;
    title: string;
}
export type List = {
    id: string;
    title: string;
    boardId: string;
}
export type Task = {
    id: string;
    title: string;
    listId: string;
}
