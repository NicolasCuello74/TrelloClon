export type Board = {
    id: string;
    title: string;
    list: List[];
}
export type List = {
    id: string;
    title: string;
    tasks: Task[];
}
export type Task = {
    id: string;
    title: string;
}
