import {Header} from "./components/Header"
import Aside from "./components/Aside"
import { useState } from "react"

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div id="Header" className="w-full h-16">
          <Header/>
        </div>

        <main className="flex w-full h-svh top-16 bg-gray-800">  
          <Aside isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
          <div id="Content" className="flex-grow h-full">

          </div>
        </main>
      </div>

    </>
  )
}

export default App
