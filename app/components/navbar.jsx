'use client'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/contexts/UserContext'
import { useRouter } from 'next/navigation'
import pocketBase from '../lib/pocketbase'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {todoLogo} from './../../app/todoLogo.png'

export default function Navbar() {


  const router = useRouter()
  const pathName = usePathname()


    const {    userDetails,
      setUserDetails,
      isAuth,
      setIsAuth,
      login,
      logout
} = useContext(UserContext)




useEffect(() => {


  if(pocketBase.authStore.isValid == true ){

    setIsAuth(true);

  }


  else{
    setIsAuth(false);
  }


}, [])



    


  return (
  
      pathName === "/" ? <div className='bg-[#0D0714] flex justify-between px-4 py-4 '> 
      
        <p className="text-white text-xl font-bold">Todoly</p>



        
          <ul className='flex justify-center items-center gap-10'>
            <li className='text-white hidden md:inline'>About</li>
            <li className='text-white hidden md:inline'>Features</li>
            <li className='text-white hidden md:inline'>Pricing</li>
            {isAuth == true ? <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            name={pocketBase.authStore.model.username.charAt(0).toUpperCase()}
            as="button"
            
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
         
          <DropdownItem key="logout" color="danger" onClick={() => {logout(); router.push("/login")}}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> : 
            <Button onClick={() => router.push("/signup")} className='text-white bg-blue-400 font-bold'>Sign up</Button>
  
  
  }   

          </ul>
       


      
      </div> : 



  
    <div className='bg-[#0D0714] flex justify-end px-4 py-4 '>


{isAuth == true ? 

<Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            name={pocketBase.authStore.model.username.charAt(0).toUpperCase()}
            as="button"
            
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
         
          <DropdownItem key="logout" color="danger" onClick={() => {logout(); pathName == "/todo" ? router.push("/login") : router.push("/")}}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

        : 
        <div className='flex gap-4'>

    

        <Button onClick={() => router.push("/login")}>Log in</Button>
        <Button className='hidden md:inline-block'>Sign up</Button>


        
        
        </div>
        
        }

        
    </div>
  )
}
