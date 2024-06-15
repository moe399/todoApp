'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { UserContext } from '../lib/contexts/UserContext'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import Pocketbase from 'pocketbase'
import pocketBase from '../lib/pocketbase'



export default function page() {

  const router = useRouter()

  const API_BASE_URL = "http://127.0.0.1:8090";



  const {
    userDetails,
    setUserDetails,
    isAuth,
    setIsAuth,
    login,
    logout
} = useContext(UserContext)


const {register, handleSubmit} = useForm();

const [loading, setLoading] = useState(false);


// useEffect(()=>{


//   if(pb.authStore.isValid == true){

   
//     router.push("/todo")


//   }
  

// }, [])


async function onSubmit(data){
  setLoading(true)


 await login(data)

  

  if(isAuth == true ){
    setLoading(false)

  }

  else{
    // Implement error message
    setLoading(false)
  }
  

}





  return (
    <main className='bg-[#0D0714] h-screen flex  flex-col items-center px-8 gap-2'>

<h1 className='text-white text-2xl font-bold'>Login</h1>

<div className='py-10 flex h-fit gap-6 flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
        <form className='flex flex-col gap-6 items-center'>
        <input {...register("username")} className="bg-transparent border-2 border-[#3E1671] px-2 py-2 rounded-xl text-white " placeholder='Username'></input>
        <input {...register("password")} className="bg-transparent border-2 border-[#3E1671] px-2 py-2 rounded-xl text-white " placeholder='Password' type='password'></input>
        <Button isLoading={loading} className='w-1/2 bg-[#9E78CF] px-2 py-1 rounded-lg text-white text-md' onClick={handleSubmit(onSubmit)}>Login</Button>

        </form>


        <Button onClick={()=> console.log(pocketBase.authStore.isValid)}>Test Button</Button>

      </div>



      </main>
  )
}
