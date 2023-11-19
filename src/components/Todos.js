import React, { useContext, useState, useEffect, useRef } from 'react'
import todoContext from '../context/todoContext'
import { useNavigate } from 'react-router-dom'
import Todoitem from './Todoitem'
function Todos() {
    let navigate = useNavigate();
    const context = useContext(todoContext);
    const { todos, getTodos, editTodo } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getTodos();
        } else {
            navigate("/login");
        }
    }, []);

    const [todo, setTodo] = useState({
        id: "", etitle: "", etask: "",
        eisComplete: ""
    })
    const updateTodo = (currentTodo) => {
        ref.current.click();
        setTodo({
            id: currentTodo._id,
            etitle: currentTodo.title,
            etask: currentTodo.task,
            eisComplete: currentTodo.isComplete,
        })
    }
    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {

        editTodo(todo.id, todo.etitle, todo.etask, todo.eisComplete);
        refClose.current.click()
    }



    return (
        <>
            <div className='display-4 text-light my-5 m-2 text-center'>
                Todos
            </div>
            <div className='container text-danger text-center mx-3'>
                {todos.length === 0 && "No Todos Please Add"}

            </div>
            <table className='mx-5 p-5 text-light text-center table'>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Task</th>
                        <th scope="col">IsCompleted</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <Todoitem key={todo._id} todo={todo}
                                updateTodo={updateTodo} />
                        )
                    })}
                </tbody>
            </table>

            <button
                ref={ref} type="button" className='btn btn-dark d-none'
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Todo
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit todo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={todo.etitle}
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="task" className="form-label">
                                        Task
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etask"
                                        name="etask"
                                        value={todo.etask}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="isComplete"
                                            value="true"
                                            name="eisComplete"
                                            onChange={onChange}
                                        />
                                        <label className="form-check-label" htmlFor="isComplete">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="isComplete"
                                            value="false"
                                            name="eisComplete"
                                            onChange={onChange}
                                        />
                                        <label className="form-check-label" htmlFor="isComplete">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button ref={refClose} type="button" className="btn bg-teal-900 btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disbaled={todo.etitle.length < 3 || todo.etask.length < 3} onClick={handleClick} type="button" className="btn bg-teal-600 btn-primary">Update Todo</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Todos
