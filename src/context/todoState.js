import { useState } from "react";
import TodoContext from "./todoContext";


const TodoState=(props)=>{
  
    const host ="https://todolistbackend-egq1.onrender.com"
    const todosInitial=[]
    const [todos, setTodo]=useState(todosInitial)

   const addTodos = async (title, task, isComplete) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, task, isComplete})
    });

    const todo = await response.json();
    setTodo(todos.concat(todo))
    props.showAlert("Todo Added","info")
  }

  //get all the todos

  const getTodos= async()=>{
      //Api call
      const response=await fetch(`${host}/fetchalltodo/`,{
          method:"GET",
          headers:{
              'Content-Type':'application/json',
              "auth-token":localStorage.getItem('token')
          }
      });
      const json=await response.json();
      setTodo(json)
  }

  //edit todo



  
  const editTodo = async (id, title, task,isComplete) => {
    // API Call 
    const response = await fetch(`${host}/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, task, isComplete})

    });
    const json = await response.json(); 
    setTodo(json);
     let newTodos = JSON.parse(JSON.stringify(todos))
    // Logic to edit in client
    for (let index = 0; index < newTodos.length; index++) {
      const element = newTodos[index];
      if (element._id === id) {
        newTodos[index].title = title;
        newTodos[index].task = task;
        newTodos[index].isComplete = isComplete;
        break; 
      }
    }  
    setTodo(newTodos);
    props.showAlert("Todo Updated","warning")
  }
   

  const deleteTodo = async (id) => {
    // API Call
    const response = await fetch(`${host}/deletetodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    setTodo(json);
    const newTodos = todos.filter((todo) => { return todo._id !== id })
    setTodo(newTodos)
    props.showAlert("Todo Deleted","danger")
  }

   
  return (
    <TodoContext.Provider value={{todos,addTodos,getTodos,editTodo,deleteTodo}}>
      {props.children}
    </TodoContext.Provider>
  )

}
export default TodoState;