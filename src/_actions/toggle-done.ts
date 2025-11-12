"use server"
import { prisma } from "@/utils/prisma"

export const updateTaskStatus = async (taskId: string) => {
    try {
        const currentTask = await prisma.tasks.findUnique({
            where: { id: taskId }
        })

        if (!currentTask) return

        const updatedStatus = await prisma.tasks.update({
            where: { id: taskId },
            data: { done: !currentTask.done }
        })

        if (!updateTaskStatus) return

        return updateTaskStatus
    } catch (error) {
        throw error
    }

}