type Props = {
    children: React.ReactNode;
};
import { cn } from '@/lib/utils';
import React from 'react';

const BoardOptions = ({children}: Props) => {
    return (
        <div className={cn(
            "board-options invisible",
            "cursor-pointer hover:bg-muted hover:text-muted-foreground p-1 rounded-sm",
        )}>
            {children}
        </div>
    );
    }

export default BoardOptions;