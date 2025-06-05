import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useListsStore } from "./utils/listStore"

type Props = {
    children?: React.ReactNode  | React.ReactNode[],
    boardId: string
}

const AddList = ({ children, boardId}: Props) => {
  const { addList } = useListsStore()
  const [name, setName] = useState("")

  const handleAddBoard = () => {
    addList({
      id: crypto.randomUUID(),
      title: name,
      boardId: boardId,
    })
    setName("")
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir lista</DialogTitle>
          <DialogDescription>Agrega la lista a tu tablero. Haz clic en guardar cuando termines.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Titulo
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {!name ? <Button disabled>Guardar</Button> : <Button onClick={handleAddBoard} type="submit">Guardar</Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddList;