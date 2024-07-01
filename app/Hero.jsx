'use client'


import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { cn } from './utils/cn'
import Ticker from 'framer-motion-ticker';

import appleLogo from "./logos/applelogo.png"
import asdaLogo from "./logos/asdalogo.png"
import googleLogo from "./logos/googleLogo.png"
import microsoftLogo from "./logos/microsoftLogo.png"
import Image from 'next/image'


function Hero() {

  
  const colors = ['#632bf3', '#f122c8', '#f16022', '#9ef344', '#44d3f3'];
  const router = useRouter();

  const arrayOfImages = [appleLogo, asdaLogo, googleLogo, microsoftLogo]

  return (
    <div className='flex flex-col items-center gap-10 md:w-3/4 md:py-20 font-roboto w-64 lg:w-1/2'>

    <div className='px-8  '>
    <p className='text-white font-bold text-3xl font-inter text-center py-6 md:text-4xl'>Todo Lists are Overcomplicated. What if there was an easier way to tick off <span className='text-purple-500'>tasks?</span></p>
    <p className='font-roboto text-sm text-gray-400 text-center'>Todoly is a user-friendly to-do list app designed to streamline your task management, eliminating complexity and helping you stay organised effortlessly.</p>
    </div>

    <div className='max-w-64  gap-6 flex '>
    {/* <Button className='bg-purple-500 text-white'>Get Started</Button> */}
    <Button className='bg-purple-500 text-white' onClick={() => router.push("/signup")}>Get Started</Button>
    <Button className='bg-transparent  border-2 text-white'>Watch A Demo</Button>
    </div>
    
    <p className='text-white'>Used by: </p>
 

    <Ticker duration={50}>
        {arrayOfImages.map((item, index) => (
          <Image
          key={index}
            height={40}
            src={arrayOfImages[index]}
            className='mx-8 h-10 w-30'
           
         
          />
        ))}
      </Ticker>


    </div>
  )
}

export default Hero