import { ModeToggle } from "./ModeToggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import TodoList from "./todo-list"
import { useEffect } from 'react'
import { DialogDemo } from "./modal"

import { useReducer } from "react"
import { getData, postData, deleteList } from '../requests'

const initialValue = {
  data: [],
  filter: [],
  priorityFilter: 'all',
  completedFilter: 'all',
  skip: 0,
  haveData: true,
}

const reducer = (state, {type, payload}) => {
    switch (type) {
      case 'SET_DATA':
          return {...state, data: [...state.data, ...payload]}
      case 'SET_FILTER':
          return {...state, filter: payload}
      case 'priority_Filter':
          return {...state, priorityFilter: payload}
      case 'completed_Filter':
          return {...state, completedFilter: payload}
      case 'SKIP':
          return {...state, skip: payload}
      case 'haveData':
          return {...state, haveData: false}
      default:
        return state
    }
} 

function App() {
  const [state, dispatch] = useReducer(reducer, initialValue)
  
  function deleteItem(id) {
   deleteList(id).then(res => {
   dispatch({type: 'SET_FILTER', payload: state.data.filter((el)=> el.id !== id)})
   })
  }

  function newPostData(data) {
    postData(data).then(res => {
      console.log([res]);
      
        dispatch({type: 'SET_DATA', payload: [res]})
    })
  }

  function handleMoreList() {
    if(state.haveData) {
      dispatch({type:'SKIP', payload: state.skip + 10})
    }
  }

  useEffect(() => {
      async function newData() {
          const res = await getData(state.skip, 10)
          dispatch({type:'SET_DATA', payload: res.data})
          if(!res.total) {
            dispatch({type: 'haveData'})
          }
      }
      newData()
  }, [state.skip])
    useEffect(() => {
      let filtered = [...state.data]
    
      if (state.priorityFilter !== 'all') {
        filtered = filtered.filter(item => item.priority === state.priorityFilter)
      }
    
      if (state.completedFilter !== 'all') {
        filtered = filtered.filter(item => item.completed === (state.completedFilter === 'Bajarilgan'))
      }
      
      dispatch({type:'SET_FILTER', payload: filtered})

    }, [state.priorityFilter, state.completedFilter, state.data])

  return (
    <div className="max-w-5xl mx-auto">
      
     <div className="flex items-end">
      <div className="grow flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
          <div className="text-3xl font-bold font-sans">Todo app</div>
          <Select onValueChange={(val)=>dispatch({type: 'priority_Filter', payload: val})}>
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
          <Select onValueChange={(val)=>dispatch({type: 'completed_Filter', payload: val})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="completed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value='Bajarilgan'>Bajarilgan</SelectItem>
              <SelectItem value='bajarilmagan'>bajarilmagan</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogDemo newPostData={newPostData}/>

      </div>
      <div className="ml-6" ><ModeToggle/></div>
     </div>

      <div className="max-w-3xl mx-auto">
        <TodoList newData={state.filter} deleteItem={deleteItem} handleMoreList={handleMoreList} haveData={state.haveData}/>
      </div>

    </div>
  )
}

export default App