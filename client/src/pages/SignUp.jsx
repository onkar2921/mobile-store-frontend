import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { signUpUser } from '../redux/slices/userSlice';
import { useNavigate,Link } from 'react-router-dom';
export default function SignUp() {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [signupstate,setSignupstate]=useState({
        username:"", 
        email:"",
        password:"", 
        address:"", 
        phoneNumber:""
    })

    const handelChange=(e)=>{
        const {name,value}=e.target
        setSignupstate({
            ...signupstate,[name]:value
        })

    }

    const handelSignUp=async(e)=>{
        e.preventDefault()
          
      const result= await dispatch(signUpUser(signupstate))
        if(result){
            navigate("/login",{replace:true})
        }
    }
  return (
   <>
   <div className='w-screen h-screen flex justify-center items-center  '>

   <form className='flex flex-col items-center justify-center bg-gray-200 p-8 rounded-md shadow-md' onSubmit={handelSignUp}>
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="text" name="username" value={signupstate?.username} onChange={handelChange} placeholder='Username' required />
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="email" name="email" value={signupstate?.email} onChange={handelChange} placeholder='Email' required/>
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="password" name="password" value={signupstate?.password} onChange={handelChange} placeholder='Password' required/>
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="text" name="address" value={signupstate?.address} onChange={handelChange} placeholder='Address'required />
  <input className='mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pink-500' type="number" name="phoneNumber" value={signupstate?.phoneNumber} onChange={handelChange} placeholder='Contact' required/>
  <button className='bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 focus:outline-none' type='submit'>SignUp</button>
    
  <Link className='mt-4' to="/login">already have account ?</Link>
</form>

    

   </div>
   
   </>
  )
}
