type Props = {
    id: string;
    children: React.ReactNode;
};
import { cn } from '@/lib/utils';
import React from 'react';

const handleMouseEnter = (id: string) => {
    const element = document.getElementById(id);
    const options = element?.querySelectorAll('.board-options')
    
    if (!options) return;
    for (const option of options) {
        option.classList.remove('invisible');
    }
}

const handleMouseLeave = (id: string) => {
    const element = document.getElementById(id);
    const options = element?.querySelectorAll('.board-options')
    
    if (!options) return

    for (const option of options) {
        option.classList.remove('visible');}
}



const BoardWrapper = ( {id, children}: Props ) => {
  return (
    <div 
    onMouseEnter={  () => handleMouseEnter(id)}
    onMouseLeave={  () => handleMouseLeave(id)}
    id={id} 
    className={cn("board-wrapper text-sm h-full w-full flex justify-between items-center p-2")}
    >
        {children}
    </div>
  );
}

export default BoardWrapper;