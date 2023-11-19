import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Login(props) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch("http://localhost:5000/login/",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        email: credentials.email,
                        password: credentials.password,

                    }),
                }
            );

            const json = await response.json();
            if (!json.success) {
                props.showAlert("Invalid Credentials",'dark')
            }
            else {
                localStorage.setItem('token',json.authToken)
                localStorage.setItem('success',json.success)
                localStorage.setItem('name',json.name)
                props.showAlert("Login Successful",'primary')
                navigate('/');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='text-center border rounded-lg w-[600px]
             h-[350px] p-9'>
                    <label htmlFor='email' className='form-label'>
                        <i className="fa-solid fa-envelope-circle-check"></i>   Email</label>
                    <br />
                    <input onChange={onChange} value={credentials.email} type="text" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="email" id="email" minLength={3} aria-describedby='emailHelp' required/>
                 <br />
                    <br />
                    <label htmlFor='password' className='form-label'>
                        <i className="fa-solid fa-key"></i>  Password</label>
                    <br />
                    <input onChange={onChange} value={credentials.password} type="password" className=' w-[400px] h-[40px] rounded-xl bg-zinc-700 
                 p-2' name="password" id="password" minLength={3} aria-describedby='passwordHelp' required/>
                 <br />
                    <br />
                    <button type="submit" className='w-[200px] h-[50px] border
                  hover:bg-teal-900'>Login</button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center
         items-center bg-teal-800 '><h2 className='text-3xl text-light'>LOGIN</h2>
            </div>
        </div>
    )
}

export default Login
