import {Header} from "./components/Header"
import Aside from "./components/Aside"
import { useState } from "react"
import { Outlet } from "react-router-dom";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  return (
    <>
      <div className="flex flex-col w-dvw h-dvh">
          <div id="Header" className="relative flex w-full h-16">
            <Header/>
          </div>

          <main className="flex flex-1 w-full bg-gray-800">
            <div className="h-full">
              <Aside isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
            </div>
            
            <div id="Content" className="flex flex-col h-full w-dvw overflow-y-hidden">
              <Outlet/>
            </div>
          </main>
      </div>
    </>
  )
}

export default App
