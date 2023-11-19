import React, {useContext, useState} from 'react'
import todoContext from '../context/todoContext'
import Todos from './Todos'
function Addtodos() {
  const [todo, setTodo] = useState({title: "", task: ""})
    const context=useContext(todoContext)
    const {addTodos}=context
  
  const onChange = (e)=>{
    setTodo({...todo, [e.target.name]: e.target.value})
}

const handleClick=(e)=>{
    e.preventDefault();
    addTodos(todo.title,todo.task);
    setTodo({title:"",task:""})
}
  return (
    <>
    <div className='w-full h-screen bg-[#1a1a1a] flex'>
    <div className='w-[30%] h-[100%] bg-[#1a1a1a] text-white flex '>
         <div className="card bg-[#1a1a1a] m-2 p-2 my-5">
         <h3 className="display-4 text-light text-center">
             Add Todo
         </h3>
         <br/>
        <form className='text-center border rounded-lg w-[400px]
             h-[270px] p-9'>

        
        <input type="text" className="w-[300px] h-[40px] rounded-xl bg-zinc-700 
                 p-2" id="title" name="title" aria-describedby='enter name' value={todo.title} onChange={onChange}   minLength={3} placeholder="Enter Title" required/>
        <br/>
                 <br/>
        
        <textarea type="text" className="w-[300px] h-[60px] rounded-xl bg-zinc-700 
                 p-2" id="task" name="task" aria-describedby='enter task' value={todo.task} onChange={onChange}   minLength={3} placeholder="Task" required></textarea>
        
        <br/>
                 <br/>
        <button onClick={handleClick} disabled={todo.title.length<3 || todo.task.length<3} type="submit" className="w-[200px] h-[50px] border
                  hover:bg-teal-900 text-light" >Add Todo</button>
        </form>
         </div>
         </div>
         <div>
            <Todos/>
         </div>
         </div>

       
    </>
  )
}


export default Addtodos