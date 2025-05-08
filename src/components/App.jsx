import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TodoList from "./todo-list"
import getData from '../requests'
import React, { useEffect, useState } from 'react'



function App() {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [completedFilter, setCompletedFilter] = useState('all')


  useEffect(() => {
      async function newData() {
          const res = await getData()
          setData(res)
      }
      newData()
  }, [])
  
  
  

    useEffect(() => {
      let filtered = [...data]
    
      if (priorityFilter !== 'all') {
        filtered = filtered.filter(item => item.priority === priorityFilter)
      }
    
      if (completedFilter !== 'all') {
        filtered = filtered.filter(item => item.completed === (completedFilter === 'Bajarilgan'))
      }
    
      setFilter(filtered)

    }, [priorityFilter, completedFilter, data])
    

    function handlePriority(value) {
      setPriorityFilter(value)
    }
    
    function handleCompleted(value) {
      setCompletedFilter(value)
    }
    
    console.log(filter);
    

  return (
    <div className="max-w-5xl mx-auto">
      
     <div className="flex items-end">
      <div className="grow flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
          <div className="text-3xl font-bold font-sans">Todo app</div>
          <Select onValueChange={handlePriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="priority"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value="low">low</SelectItem>
              <SelectItem value="medium">medium</SelectItem>
              <SelectItem value="high">high</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleCompleted}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="completed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value='Bajarilgan'>Bajarilgan</SelectItem>
              <SelectItem value='bajarilmagan'>bajarilmagan</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>Qo'shish</Button>

        </div>
        <div className="" ><ModeToggle/></div>
     </div>

      <div className="max-w-3xl mx-auto">
        <TodoList newData={filter}/>
      </div>

    </div>
  )
}

export default App