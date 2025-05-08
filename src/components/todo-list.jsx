
 
 function TodoList({newData}) {
    console.log(newData);
    

   return (
     <div>
       {newData.length > 0 ? (newData.map((item, index) => {
        
         return <div key={item.id} className="flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
            <p className='w-1/2 text-xl font-bold font-mono'>{`${index +1}. ${item.title}`}</p>
            <p>{item.priority}</p>                
            <p>{item.completed ? 'bajarilgan' : 'bajarilmagan' }</p>                
        </div>
       })) : <p>loading...</p>}
     </div> 
   )
 }
 
 export default TodoList