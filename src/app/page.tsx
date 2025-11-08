import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus, List, Check, ArrowDown, Edit, SquarePen, Trash, ListCheck, Sigma } from 'lucide-react';
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Home = () => {
  return (
    <main className='w-full h-screen bg-gray-100 flex justify-center items-center'>
      <Card className='w-lg'>
        <CardHeader className='flex gap-2'>

          <Input placeholder='Adicionar tarefa' />
          <Button variant={'default'} className='cursor-pointer'>  <Plus /> Cadastrar</Button>

        </CardHeader>



        <CardContent>
          <Separator className='mb-4' />
          <div className='flex gap-2'>
            <Badge className='cursor-pointer' variant={'default'}>  <List /> Todas </Badge>
            <Badge className='cursor-pointer' variant={'outline'}>  <ArrowDown /> Não finalizadas </Badge>
            <Badge className='cursor-pointer' variant={'outline'}>  <Check /> Concluídas </Badge>
          </div>

          <div className='mt-4 border-b'>

            <div className=' h-14 flex justify-between items-center  border-t'>
              <div className='w-1 h-full bg-green-300'></div>
              <p className='flex-1 px-2 text-sm text-gray-600'>Estudar React</p>
              <div className='flex gap-2'>
                <Dialog>
                  <DialogTrigger asChild><SquarePen className='cursor-pointer' size={18} /></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Tarefa</DialogTitle>
                    </DialogHeader>

                    <div className='flex gap-2'>
                      <Input placeholder='Editar tarefa' />
                      <Button className='cursor-pointer'>
                        Editar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash className='cursor-pointer' size={18} />
              </div>
            </div>
           
          </div>
          <div className='flex justify-between mt-4'>

            <div className='flex items-center gap-2'>
              <ListCheck size={18} />
              <p className='text-xs'> Tarefas concluídas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='text-xs h-7 cursor-pointer' variant={'outline'}><Trash />Limpar tarefas concluídas</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja excluir X itens?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

          <div className='h-2 w-full bg-gray-100 mt-4 rounded-md'>
            <div className='h-full  bg-blue-500 rounded-md' style={{ width: "50%" }}>
            </div>
          </div>


          <div className='flex justify-end text-xs items-center mt-2 gap-2'>
            <Sigma size={18} />
            <p>3 Tarefas no total</p>
          </div>

        </CardContent>


      </Card>
    </main>
  )
}

export default Home