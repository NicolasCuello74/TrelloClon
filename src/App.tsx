import {Header} from "./components/Header"
import Aside from "./components/Aside"
import { useState } from "react"
import Board from "./components/Board";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const board = {
    id: "1",
    title: "My Board",
    list: [
      {
        id: "1",
        title: "To Do",
        tasks: [
          {
            id: "1",
            title: "Task 1",
          },
          {
            id: "2",
            title: "Task 2",
          },
        ]
      },
      {
        id: "2",
        title: "In Progress",
        tasks: [
          {
            id: "3",
            title: "Task 3",
          },
          {
            id: "4",
            title: "Task 4",
          },
        ]
      },
      {
        id: "3",
        title: "Done",
        tasks: [
          {
            id: "5",
            title: "Task 5",
          },
          {
            id: "6",
            title: "Task 6",
          },
        ]
      },
      {
        id: "4",
        title: "Archived",
        tasks: [
          {
            id: "7",
            title: "Task 7",
          },
          {
            id: "8",
            title: "Task 8",
          },
        ]
      },
      {
        id: "5",
        title: "Archived",
        tasks: [
          {
            id: "7",
            title: "Task 7",
          },
          {
            id: "8",
            title: "Task 8",
          },
        ]
      },
      {
        id: "3",
        title: "Done",
        tasks: [
          {
            id: "5",
            title: "Task 5",
          },
          {
            id: "6",
            title: "Task 6",
          },
        ]
      },
      {
        id: "4",
        title: "Archived",
        tasks: [
          {
            id: "7",
            title: "Task 7",
          },
          {
            id: "8",
            title: "Task 8",
          },
        ]
      },
      {
        id: "5",
        title: "Archived",
        tasks: [
          {
            id: "7",
            title: "Task 7",
          },
          {
            id: "8",
            title: "Task 8",
          },
        ]
      },{
        id: "5",
        title: "Archived",
        tasks: [
          {
            id: "7",
            title: "Task 7",
          },
          {
            id: "8",
            title: "Task 8",
          },
        ]
      }
    ]
  };


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
              <Board board={board} />
            </div>
          </main>
      </div>
    </>
  )
}

export default App
