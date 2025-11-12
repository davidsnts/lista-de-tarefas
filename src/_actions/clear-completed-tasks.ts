"use server"

import { prisma } from '@/utils/prisma'

export const deleteCompletedTasks = async () => {
    try {
        const deletedTasks = await prisma.tasks.deleteMany({
            where: { done: true }
        });

        return deletedTasks;
    } catch (error) {
        throw error
    }
}