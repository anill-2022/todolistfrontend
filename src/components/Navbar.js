import React from 'react'
import { Link,useNavigate } from 'react-router-dom'



function Navbar(props) {
    let navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('success')
        navigate("/login")

    }
  return (
    <nav className="flex justify-around p-3 border-p border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300 text-light">
  
    <Link className="text-3xl text-dark p-3" style={{backgroundColor:"#ffffff",borderRadius:"20px"}} to="/">{props.title}</Link>
    <Link  to="/" className="me-md-2">
            <i className="fa-solid fa-house-user"></i> Home</Link>
            
     
            {!localStorage.getItem('token')? <ul className="flex gap-6"><Link  to="/signup" className="me-md-2">
            <i className="fa-solid fa-user mx-1"></i>Signup</Link>
            <Link  to="login" className="">
            <i className="fa-solid fa-user-check mx-2"></i>  Login</Link></ul>:
            <ul className="flex gap-6">
            <span  onClick={logout} role="button" className='bg-warning p-2 text-dark'>
                <i className="fa-solid fa-user mx-1"></i>Logout</span></ul>
            }
    
    
</nav>
  )
}

export default Navbar
