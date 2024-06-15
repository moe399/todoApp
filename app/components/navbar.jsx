'use client'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/contexts/UserContext'
import { useRouter } from 'next/navigation'
import pocketBase from '../lib/pocketbase'

export default function Navbar() {


  const router = useRouter()


    const {    userDetails,
      setUserDetails,
      isAuth,
      setIsAuth,
      login,
      logout
} = useContext(UserContext)




useEffect(() => {


  if(localStorage.getItem("loginState") == "true" ){

    setIsAuth(true);

  }


  else{
    setIsAuth(false);
  }


}, [])



    


  return (
    <div className='bg-[#0D0714] flex justify-end px-4 py-4 '>


{isAuth == true ? 

<Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            name='M'
            as="button"
            
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
         
          <DropdownItem key="logout" color="danger" onClick={() => {logout(); router.push("/login")}}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

        : <Button onClick={() => router.push("/login")}>Log in</Button>
        
        
        
        }

        
    </div>
  )
}
