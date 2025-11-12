"use server"
import { prisma } from '@/utils/prisma'

type EditTaskProps = {
    idTask: string,
    EdtTask: string
}

export const editTask = async ({ idTask, EdtTask }: EditTaskProps) => {

    try {
        if (!idTask || !EdtTask) return

        const editedTask = await prisma.tasks.update({
            where: { id: idTask},
            data: {task: EdtTask}
        })

        if(!editedTask) return

    } catch (error) {
        throw error
    }

}