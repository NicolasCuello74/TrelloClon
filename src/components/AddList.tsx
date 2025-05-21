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
      tasks: [],
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
          <DialogTitle>Add List</DialogTitle>
          <DialogDescription>Add list to your board. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tittle
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {!name ? <Button disabled>Save changes</Button> : <Button onClick={handleAddBoard} type="submit">Save changes</Button>}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddList;