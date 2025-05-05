import { Separator } from "./ui/separator"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, SquareKanban, SquareUserRound, Settings, icons } from "lucide-react"

interface AsideProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}


const Aside: React.FC<AsideProps> = ({ isCollapsed, setIsCollapsed }) => {
  const name = 'Nicolas Cuello';

  return (
    <aside className={`relative h-full bg-gray-800 border-r border-background text-white transition-all duration-300 ${isCollapsed ? "w-[24px]" : "w-64"}`}>
      <div className="relative flex items-center gap-4">
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
      <div className="h-full">
        {!isCollapsed && (
          <ul className="flex flex-col w-auto h-auto gap-4">
            <div className="flex gap-2 px-4 pt-2 rounded hover:bg-gray-700">
              <SquareKanban />
              <li><a href="#" className="block">Tableros</a></li>
            </div>
            <div className="flex gap-2 px-4 rounded hover:bg-gray-700">
              <SquareUserRound />
              <li><a href="#" className="block">Miembros</a></li>
            </div>
            <div className="flex gap-2 px-4 rounded hover:bg-gray-700">
              <Settings />
              <li><a href="#" className="block">Ajustes</a></li>
            </div>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Aside;