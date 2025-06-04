import { create } from 'zustand';
import { Task as TaskType } from '@/types';

type TasksStore = {
    tasks: TaskType[];
    addTask: (task: TaskType) => void;
    removeTask: (taskId: string) => void;
    updateTask: (taskId: string, updatedTask: TaskType) => void;
    updateTaskList: (taskId: string, newListId: string) => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]') as TaskType[],

    addTask: (task) => set(({ tasks }) => {
        const updatedTasks = [...tasks, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
    }),

    removeTask: (taskId) => set(({ tasks }) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
    }),

    updateTask: (taskId, updatedTask) => set(({ tasks }) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? updatedTask : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
    }),

    updateTaskList: (taskId, newListId) => set(({ tasks }) => {
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, listId: newListId } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
}),

}));