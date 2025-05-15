import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from './components/Board.tsx'


const router = createBrowserRouter([
  { path: '/', 
    element: <App />,
    children:[
      { path: '/board/:boardId', 
        element: <Board />}
    ]},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
