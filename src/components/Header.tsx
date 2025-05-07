import {ClipboardList} from 'lucide-react'

export const Header = () => {
  return (
    <header className='fixed w-full h-16 bg-accent-foreground text-accent flex items-center gap-2 shadow-2xl pl-2'>
        <ClipboardList size={30}/>
        <h1 className='text-xl font-medium'>Trello</h1>
    </header>
  )
}
