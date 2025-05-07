import { Separator } from "./ui/separator"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronLeft, Plus, Ellipsis, ChevronRight, SquareKanban, SquareUserRound, Settings } from "lucide-react"
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";

interface AsideProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}


const Aside: React.FC<AsideProps> = ({ isCollapsed, setIsCollapsed }) => {
  const name = 'Nicolas Cuello';
  const boards = [
    { id: 1, name: "Tablero 1" },
    { id: 2, name: "Tablero 2" },
    { id: 3, name: "Tablero 3" }
  ];
  
  return (
    <aside className={`relative h-full bg-gray-800 border-r border-background text-white transition-all duration-300 ${isCollapsed ? "w-[24px]" : "w-64"}`}>
      <div className="flex h-20 items-center gap-4 px-4 py-2">
        {!isCollapsed && (
          <Avatar>
            <div className="w-full h-full text-2xl text-center bg-gray-400">
              {name[0].toUpperCase()}
            </div>
          </Avatar>
        )}
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <span className="text-xs italic">Gratuito</span>
          </div>
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
                <Plus/>
              </BoardOptions>
            </BoardWrapper>
            
            <Separator/>
            
            <div id="boards-container" className="flex flex-col py-4">
              {boards.map((board) => (
                <div key={board.id} className="px-4 py-1 hover:bg-muted-foreground">
                  <BoardWrapper id={`board-${board.id}`}>
                    <h3 className="">{board.name}</h3>
                    <BoardOptions>
                        <Ellipsis size={16}/>
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