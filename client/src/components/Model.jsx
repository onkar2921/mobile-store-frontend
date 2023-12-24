import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'

export default function Model({handelModel}) {
  const [token,setToken]=useState("")
    
    useEffect(()=>{

            setToken(localStorage.getItem("token"))

    },[token])

    
const navigate=useNavigate()
const handelLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
}
  return (
   <>
  <div className='fixed top-4 right-3 md:right-6 lg:right-12 z-50'>
  <div className='h-[300px] w-[300px] md:w-[350px] lg:w-[400px] rounded-lg bg-white shadow-xl flex flex-col items-center justify-start p-6'>
    <button className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 hover:text-red-600' onClick={() => handelModel()}>X</button>
    <div className='w-full flex flex-col items-center mt-4'>
      {token && <Link className='m-2 text-lg hover:text-red-600' to="/dashboard">Dashboard</Link>}
      <Link className='m-2 text-lg text-gray-800 hover:text-red-600' to="/login">Login</Link>
      <Link className='m-2 text-lg text-gray-800 hover:text-red-600' to="/signUp">SignUp</Link>
      {token && <button className='m-2 text-lg bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600' onClick={handelLogout}>Logout</button>}
    </div>
  </div>
</div>


   </>
  )
}
