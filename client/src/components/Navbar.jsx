import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import Model from './Model'
import mobilestore from "../utils/mobilestore.jpg"
import cart from "../utils/cart.png"
export default function Navbar() {
    const [menu,setMenu]=useState(false)
    const handelMenu=()=>{
        setMenu(!menu)
    }
    
    const [model,setModel]=useState(false)

    const handelModel=()=>{
        setModel(!model)
    }

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
   <nav className={`w-full h-[60px] bg-pink-500 text-white text-2xl flex justify-around items-center ${menu?'hidden lg:flex': ' '}`}>
        <div className={`cursor-pointer  sm:block lg:hidden`} onClick={handelMenu}>=</div>
        <Link to="/"><img className=' rounded-md h-[50px] w-[70px] ' src={mobilestore} alt="mobile store logo" /></Link>
        <Link to="/cart"><img className=' rounded-md h-[50px] w-[70px] ' src={cart} alt="cart" /></Link>
        <button className='hidden sm:hidden lg:block' onClick={handelModel}>options</button>
   </nav>
   {/* model above large window */}

   {model && <Model handelModel={handelModel}/>}



   {/* side bar menu */}
   <div className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 ${menu ? 'block' : 'hidden'} transform`}>
  <section className='h-full w-[40%] text-white bg-gradient-to-r from-pink-500 to-purple-500 flex-col absolute left-0 top-0 gap-8 z-50 justify-center items-center'>
    <div className='flex items-center justify-center w-full flex-col p-6'>
      <button className='text-4xl font-bold text-pink-300' onClick={handelMenu}>X</button>
      <section className='h-full w-full flex flex-col justify-center items-center mt-4'>
        {token && <Link className='m-2 text-lg hover:text-yellow-300' to="/dashboard">Dashboard</Link>}
        <Link className='m-2 text-lg hover:text-yellow-300' to="/login">Login</Link>
        <Link className='m-2 text-lg hover:text-yellow-300' to="/signUp">SignUp</Link>
        {token && <button className='m-2 text-lg bg-pink-300 text-white py-2 px-4 rounded-full hover:bg-pink-400' onClick={handelLogout}>Logout</button>}
      </section>
    </div>
  </section>
  <section className=' h-full w-[60%] text-black bg-white flex-col absolute right-0 top-0 gap-8 z-50 justify-center items-center'>
    {/* Right part content */}
  </section>
</div>




   </>
  )
}
