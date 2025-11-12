"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus, List, Check, ArrowDown, Trash, ListCheck, Sigma, LoaderCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getTasks } from '@/_actions/get-tasks-from.db'
import EditTask from '@/components/edit-task'
import { Tasks } from '@/generated/prisma/client'
import { NewTask } from '@/_actions/add-task'
import { deleteTask } from '@/_actions/delete-task'
import { toast } from "sonner"
import { log } from 'node:console'
import { updateTaskStatus } from '@/_actions/toggle-done'
import Filter, { FilterType } from '@/components/filter'
import { deleteCompletedTasks } from '@/_actions/clear-completed-tasks'

const Home = () => {

  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([])

  const handleGetTasks = async () => {

    try {
      const tasks = await getTasks()
      if (!tasks) return
      setTaskList(tasks)
    } catch (error) {
      throw error
    }
  }

  const handleAddTask = async () => {
    setLoading(true)
    if (task.length === 0 || !task) {
      toast.error('Insira uma atividade!')
      setLoading(false)
      return
    }
    const myNewTask = await NewTask(task);

    if (!myNewTask) {
      setLoading(false)
      return
    }

    toast.success('Tarefa adicionada com sucesso!')
    setTask('')
    await handleGetTasks();
    setLoading(false)
  }

  const handleDeleteTask = async (id: string) => {

    try {
      if (!id) return

      const deletedTask = await deleteTask(id);

      if (!deletedTask) return

      toast.warning('Tarefa removida com sucesso!')
      await handleGetTasks();

    } catch (error) {
      throw error
    }
  }

  const handleToggleTask = async (taskId: string) => {
    const previewsTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task, done: !task.done
            }
          }
          else {
            return task
          }
        })
        return updatedTaskList
      })

      const updateStatus = await updateTaskStatus(taskId)

    } catch (error) {
      setTaskList(previewsTasks)
      throw error
    }

  }

  const clearCompletedTasks = async () => {
    const deletedTasks = await deleteCompletedTasks();
    const {count} = deletedTasks;    

    if(count)
      toast.success(`${count} tarefas foram deletadas!`) 
    await handleGetTasks();
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList)
        break;
      case "pending":
        const pendingTasks = taskList.filter(task => !task.done)
        setFilteredTasks(pendingTasks)
        break;
      case "completed":
        const completedTasks = taskList.filter(task => task.done)
        setFilteredTasks(completedTasks)
        break;

      default:
        break;
    }
  }, [currentFilter, taskList])

  return (
    <main className='w-full h-screen bg-gray-100 flex justify-center items-center'>
      <Card className='w-lg'>
        <CardHeader className='flex gap-2'>

          <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder='Adicionar tarefa' />
          <Button onClick={handleAddTask} variant={'default'} className='cursor-pointer'>
            {loading ? <LoaderCircle className='animate-spin' /> : <Plus />}


            Cadastrar
          </Button>

        </CardHeader>

        <CardContent>
          <Separator className='mb-4' />

          <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

          <div className='mt-4 border-b'>
            {filteredTasks.length === 0 && <p className='text-xs border-t py-4'>Você não possui atividades cadastradas</p>}
            {filteredTasks.map((task) => (
              <div key={task.id} className=' h-14 flex justify-between  items-center  border-t'>
                <div className={`${task.done ? 'w-1 h-full bg-green-400' : 'w-1 h-full bg-red-400'}`}></div>
                <p onClick={() => handleToggleTask(task.id)} className='flex-1 px-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800'>{task.task}</p>
                <div className='flex gap-2 items-center'>

                  <EditTask task={task} handleGetTasks={handleGetTasks} />

                  <Trash onClick={() => handleDeleteTask(task.id)} className='cursor-pointer' size={18} />
                </div>
              </div>
            ))}

          </div>
          <div className='flex justify-between mt-4'>

            <div className='flex items-center gap-2'>
              <ListCheck size={18} />
              <p className='text-xs'> Tarefas concluídas ({ taskList.filter( task => task.done).length }/{taskList.length})</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='text-xs h-7 cursor-pointer' variant={'outline'}><Trash />Limpar tarefas concluídas</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir { taskList.filter(t => t.done).length} itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={clearCompletedTasks} className='cursor-pointer'>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

          <div className='h-2 w-full bg-gray-100 mt-4 rounded-md'>
            <div className='h-full  bg-blue-500 rounded-md' style={{ width: `${((taskList.filter(task => task.done).length) / taskList.length) * 100}%` }}>
            </div>
          </div>


          <div className='flex justify-end text-xs items-center mt-2 gap-2'>
            <Sigma size={18} />
            <p>{taskList.length} Tarefas no total</p>
          </div>

        </CardContent>


      </Card>
    </main>
  )
}

export default Home