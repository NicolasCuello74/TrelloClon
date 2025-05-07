import { Separator } from './ui/separator'
import { Button} from './ui/button';
import type { Board } from '../types';
import BoardWrapper from './BoardWrapper';
import BoardOptions from './BoardOptions';
import { Plus } from 'lucide-react';

type Props = {
    board: {
      id: string;
      title: string;
      list: {
        id: string;
        title: string;
        tasks: {
          id: string;
          title: string;
        }[];
      }[];
    };
  };

const Board = ({ board }: Props) => { 
    return (
        <>
            <div className="board-header h-20 flex items-center pl-4 gap-4 text-lg text-muted">
                <h2 className='h-auto w-auto rounded-2xl hover:bg-muted-foreground p-2'>{board.title}</h2>
                <Button/>
            </div>
            <Separator/>
            <div className="board-content flex flex-nowrap text-muted overflow-x-auto h-full max-h-[calc(100vh-80px)]">
                {board.list.map((list) => (
                    <>
                    <div key={list.id} className="list h-fit w-52 border-2 border-gray-300 rounded-lg p-4 m-2">
                        <div className='flex flex-col gap-1'>
                            <h3 className="text-lg font-semibold">{list.title}</h3>
                            <ul>
                                {list.tasks.map((task) => (
                                    <li key={task.id}>
                                        <h4>{task.title}</h4>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    
                        <BoardWrapper id={list.id}>
                            <div  className='flex justify-between'>
                                <h4>Anadir Tarjeta</h4>
                                <BoardOptions>
                                    <Plus/>
                                </BoardOptions>
                            </div>
                        </BoardWrapper>
                    
                    </div>

                    </>
                ))}
            </div>
        </>
    );
    }

    export default Board;