import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useBoardsStore } from "./utils/boards"

type Props = {
  children?: React.ReactNode  | React.ReactNode[],
  boardId: string
}

const DeleteBoards = ({ children, boardId }: Props) => {
  const { removeBoard } = useBoardsStore()
  const handleBoard = () => {
    removeBoard(boardId)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your board.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBoard}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBoards;