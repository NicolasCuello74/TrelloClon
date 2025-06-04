type Props = {
    children: React.ReactNode;
};
import { cn } from '@/lib/utils';
import React from 'react';

const BoardOptions = ({children}: Props) => {
    return (
        <div className={cn(
            "board-options",
            "cursor-pointer hover:bg-muted-foreground hover:opacity-60 text-muted p-1 rounded-sm flex justify-between items-center",
        )}>
            {children}
        </div>
    );
    }

export default BoardOptions;