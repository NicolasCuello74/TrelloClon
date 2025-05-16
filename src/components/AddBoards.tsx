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
import { useBoardsStore } from "./utils/boards"

type Props = {
  children?: React.ReactNode  | React.ReactNode[]
}

const AddBoar = ({ children }: Props) => {
  const { addBoard } = useBoardsStore()
  
  const [name, setName] = useState("")
  const handleAddBoard = () => {
    addBoard({
      id: crypto.randomUUID(),
      title: name,
      list: [],
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
          <DialogTitle>Add Board</DialogTitle>
          <DialogDescription>Add board to your profile. Click save when you're done.</DialogDescription>
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
            <Button onClick={handleAddBoard} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddBoar;