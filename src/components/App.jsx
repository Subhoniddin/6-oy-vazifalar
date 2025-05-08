import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import TodoList from "./todo-list"
import getData from '../requests'
import React, { useEffect, useState } from 'react'
import { DialogDemo } from "./modal"

function App() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [completedFilter, setCompletedFilter] = useState('all')
  const [skip, setskip] = useState(0)

  function handleMoreList() {
    setskip(prev => prev + 10)
    console.log(skip);
  }

  function postData(postD) {
      fetch('https://json-api.uz/api/project/fn37/todos', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(postD)
      }).then(req => req.json()).then(res => {
          setData(prev => [...prev, res])
       }).catch(err => {
        console.log(err.message);
      })
  }

  useEffect(() => {
      async function newData() {
          const res = await getData(skip, 10)
          setData(prev => [...prev, ...res])
      }
      newData()
  }, [skip])
  
  
  

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
    
    function deleteList(id) {
      fetch(`https://json-api.uz/api/project/fn37/todos/${id}`, {
        method: 'DELETE',
      }).then(res => res.text()).then(data => {console.log(data);
      }).catch(err => {
        console.log(err.message);
      })

      setData(prev => prev.filter(item => item.id !== id))

    }

    function handlePriority(value) {
      setPriorityFilter(value)
    }
    
    function handleCompleted(value) {
      setCompletedFilter(value)
    }
    
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
          
          <DialogDemo postData={postData}/>

      </div>
      <div className="" ><ModeToggle/></div>
     </div>

     

      <div className="max-w-3xl mx-auto">
        <TodoList newData={filter} deleteList={deleteList} handleMoreList={handleMoreList}/>
      </div>

    </div>
  )
}

export default App