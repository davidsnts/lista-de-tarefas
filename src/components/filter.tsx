import React, { Dispatch, SetStateAction } from 'react'
import { Badge } from './ui/badge'
import { ArrowDown, Check, List } from 'lucide-react'

export type FilterType = "all" | "pending" | "completed"

type FilterProps = {
    currentFilter: FilterType,
    setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

const Filter = ({ currentFilter, setCurrentFilter } : FilterProps) => {
    return (
        <div className='flex gap-2'>
            <Badge onClick={() => setCurrentFilter('all')} className='cursor-pointer' variant={`${currentFilter === 'all' ? 'default' : 'outline'}`}>  <List /> Todas </Badge>
            <Badge onClick={() => setCurrentFilter('pending')} className='cursor-pointer' variant={`${currentFilter === 'pending' ? 'default' : 'outline'}`}>  <ArrowDown /> Não finalizadas </Badge>
            <Badge onClick={() => setCurrentFilter('completed')} className='cursor-pointer' variant={`${currentFilter === 'completed' ? 'default' : 'outline'}`}>  <Check /> Concluídas </Badge>
        </div>
    )
}

export default Filter