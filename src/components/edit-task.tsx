import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SquarePen } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Tasks } from "@/generated/prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { editTask } from "@/_actions/edita-task"


type TaskProps = {
    task: Tasks,
    handleGetTasks: () => void
}

const EditTask = ({ task, handleGetTasks }: TaskProps) => {

    const [editedTask, setEditedTask] = useState(task.task);

    const handleEditTask = async () => {
        
        try {
            if (task.task === editedTask) {
                toast.error('As informações não foram alteradas')
                return
            } else {
                toast.success('Atualizado com sucesso!')
                await editTask({ idTask: task.id, EdtTask: editedTask, })
                handleGetTasks()
            }
        } catch (error) {
            throw error
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild><SquarePen className='cursor-pointer' size={18} /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Tarefa</DialogTitle>
                </DialogHeader>

                <div className='flex gap-2'>
                    <Input
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        placeholder='Editar tarefa' />
                    <DialogClose asChild>
                        <Button onClick={handleEditTask} className='cursor-pointer'>
                            Editar
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default EditTask