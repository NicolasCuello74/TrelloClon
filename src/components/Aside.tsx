import { Separator } from "./ui/separator"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronLeft, Plus, Ellipsis, ChevronRight, SquareKanban, SquareUserRound, Settings, X } from "lucide-react"
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { useState } from "react";
import { useUserStore } from "./utils/user";
import AddBoar from "./AddBoards";
import { useBoardsStore } from "./utils/boards";
import { Link } from "react-router-dom";
import DeleteBoards from "./DeleteBoards";

interface AsideProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}


const Aside: React.FC<AsideProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { name, setName } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const boards = useBoardsStore((state) => state.boards);
  
  return (
    <aside className={`relative h-full bg-gray-800 border-r border-background text-white transition-all duration-300 ${isCollapsed ? "w-[24px]" : "w-64"}`}>
      <div className="flex h-20 items-center gap-4 px-4 py-2">
        {!isCollapsed && (
          <>
            <Avatar>
              <div className="w-full h-full text-2xl text-center bg-gray-400">
                {name ? name[0].toUpperCase() : "U"}
              </div>
            </Avatar>
            <div className="flex flex-col gap-1 w-3/4">
                {isEditing ? (
                  <input
                    type="text"
                    className="text-xl w-auto font-bold bg-gray-700 text-white rounded px-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                  />
                  ) : (
                  <h2 className="text-xl font-bold cursor-pointer" onClick={() => setIsEditing(true)}>
                    {name ? name : "Usuario"}
                  </h2>
                  )}
                  <span className="text-xs italic">Gratuito</span>
              </div>
            </>
        )}
        <Button
          size="icon"
          className="absolute top-2 right-[-14px] bg-gray-700 rounded-full p-1"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Separator />
      <div id="Boards" className="w-full flex flex-col">
        {!isCollapsed && (
          <>
            <BoardWrapper id="board-title">
              <div className="flex gap-1">
                  <SquareKanban />
                  <h2 className="font-medium">Tableros</h2>
              </div>
              <BoardOptions>
                <AddBoar>
                  <Plus/>
                </AddBoar>
              </BoardOptions>
            </BoardWrapper>
            
            <Separator/>
            
            <div id="boards-container" className="flex flex-col pt-4">
              {boards.map((board) => (
                <div key={board.id} className="px-4 hover:bg-muted-foreground">
                  <BoardWrapper id={`board-${board.id}`}>
                    <Link to={`/board/${board.id}`} className="flex gap-1">{board.title}</Link>
                    <BoardOptions>
                        <DeleteBoards boardId={board.id}>
                          <X size={16}/>
                        </DeleteBoards>                    
                    </BoardOptions>
                  </BoardWrapper>
                </div>
              ))}
            </div> 
            <Separator/>
            <div className="flex p-4 w-full justify-between items-center rounded hover:bg-gray-700">
              <div className="flex gap-2">
                <SquareUserRound />
                <a href="#" className="block">Miembros</a>
              </div>
              <Ellipsis/>
            </div>
            <div className="flex p-4 w-full justify-between items-center rounded hover:bg-gray-700">
              <div className="flex gap-2">
                <Settings />
                <a href="#" className="block">Ajustes</a>
              </div>
              <Ellipsis/>
            </div>
            </>
        )}
      </div>
    </aside>
  );
};

export default Aside;