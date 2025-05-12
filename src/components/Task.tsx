import { Task as TaskType } from '../types';

type Props = {
    task: TaskType;
}

const Task = ({ task }: Props) => {
    
    return (
    <div key={task.id} className='bg-gray-600 p-2 rounded-md border-2 border-transparent hover:border-white duration-200'>
        <h4>{task.title}</h4>
    </div>
)}

export default Task;