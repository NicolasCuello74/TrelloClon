export type Board = {
    id: string;
    title: string;
    color: string;
    list: List[];
}
export type List = {
    id: string;
    title: string;
    boardId: string;
    tasks: Task[];
}
export type Task = {
    id: string;
    title: string;
}
