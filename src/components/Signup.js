import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
    const [credentials,setCredentials]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
    });
    let navigate=useNavigate();
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            if(credentials.password !== credentials.cpassword){
                props.showAlert("Password Incorrect",'warning')
            }
            else{
                const response=await fetch("https://todolistbackend-egq1.onrender.com/",
            {
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:credentials.name,
                    email:credentials.email,
                    password:credentials.password,
                    cpassword:credentials.cpassword,
                }),
            }
            );

            const json=await response.json();
            if(!json.success){
                props.showAlert("Email Exists",'info')
            }
            else{
                props.showAlert("SignUp Success",'success')
                navigate('/login');
            }
        }
            }
        catch(error){
            props.showAlert("Internal Server Error",'danger')
        }
    }
  return (
    <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='text-center border rounded-lg w-[600px]
             h-[500px] p-9'>
                <label htmlFor='name' className='form-label'>
                <i className="fa-solid fa-file-signature"></i>  User Name</label>
                <br/>
                <input type="text" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="name" id="name" onChange={onChange} value={credentials.name} minLength={3} aria-describedby='nameHelp' required/>
                 <br/>
                 <br/>
                 <label htmlFor='email' className='form-label'>
                 <i className="fa-solid fa-envelope-circle-check"></i>   Email</label>
                <br/>
                <input onChange={onChange} value={credentials.email} type="text" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="email" id="email" minLength={3} aria-describedby='emailHelp' required/>
                 <br/>
                 <br/>
                 <label htmlFor='password' className='form-label'>
                 <i className="fa-solid fa-key"></i>  Password</label>
                <br/>
                <input onChange={onChange} value={credentials.password} type="password" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="password" id="password" minLength={3} aria-describedby='passwordHelp' required/>
                 <br/>
                 <br/>
                 <label htmlFor='cpassword' className='form-label'>
                 <i className="fa-solid fa-key"></i>  Confirm Password</label>
                <br/>
                <input onChange={onChange} value={credentials.cpassword} type="password" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="cpassword" id="cpassword" minLength={3} aria-describedby='cpasswordHelp' required/>
                 <br/>
                 <br/>
                 <button type="submit" className='w-[200px] h-[50px] border
                  hover:bg-teal-900'>Sign Up</button>
            </form>
        </div>
        <div className='w-[50%] h-[100%] flex justify-center
         items-center bg-teal-800'> 
         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone" />
                        
            
        </div>
    </div>
  )
}

export default Signup
