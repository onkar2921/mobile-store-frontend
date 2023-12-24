import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { LoginUser } from '../redux/slices/userSlice';
import { useNavigate ,Link} from 'react-router-dom';
export default function Login() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [loginstate,setLoginstate]=useState({
        email:"",
        password:""
    })

    const handelChange=(e)=>{
        const {name,value}=e.target
        setLoginstate({
            ...loginstate,[name]:value
        })
        
    }

    const handelLogin=async(e)=>{
        e.preventDefault()
          
       const result= await dispatch(LoginUser(loginstate))
       console.log("login result",result?.payload?.success)
       if(!result?.payload?.success){
    }else{

           navigate("/")

       }
    }
  return (
   <>
   <div className='w-screen h-screen flex justify-center items-center  '>

   <form className='flex flex-col items-center justify-center bg-gray-200 p-8 rounded-md shadow-md' onSubmit={handelLogin}>

  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="email" name="email" value={loginstate?.email} onChange={handelChange} placeholder='Email' required/>
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="password" name="password" value={loginstate?.password} onChange={handelChange} placeholder='Password' required/>

  <button className='bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 focus:outline-none' type='submit'>Login</button>
  <Link className='mt-4' to="/signUp">Register ?</Link>
</form>

   </div>
   
   </>
  )
}
