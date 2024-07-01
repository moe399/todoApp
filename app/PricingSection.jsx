'use client'

import { Button, Card, CardHeader, Divider } from '@nextui-org/react'
import React, { useState } from 'react'
import TickIcon from "./todo/assets/check.svg"
import Image from 'next/image'

function PricingSection() {




  return (
    <div className='w-full flex flex-col justify-center items-center'>


        <h1 className='text-white text-2xl font-bold mb-8 '>Free and paid pricing</h1>


        <div className='flex flex-col items-center w-full md:flex-row md:justify-center gap-6'>

            <div className='bg-slate-950 rounded-2xl text-white flex flex-col items-center px-2 py-8 w-full max-w-lg md:py-10 gap-8   '>

           
                 <div className='text-center '>                
                <p className='font-bold text-xl'>Playground</p>
                <p className=''>Free Edition</p>
                </div>   

                <div className='flex justify-center items-center gap-2'>
                    <p className='font-bold text-5xl '>£0</p>
                    <p>per Month</p>
                </div>


                <Divider className='bg-gray-300 w-3/4'/>
        


                <ul className='flex flex-col gap-2'>
                    <li className='flex gap-2 mt-6'>
                        <Image src={TickIcon}></Image>
                        <p> Unlimited Todos</p>
                        </li>
                        <li className='flex gap-2'>
                        <Image src={TickIcon}></Image>
                        <p> Unlimited Todos</p>
                        </li> <li className='flex gap-2'>
                        <Image src={TickIcon}></Image>
                        <p> Unlimited Todos</p>
                        </li> <li className='flex gap-2'>
                        <Image src={TickIcon}></Image>
                        <p> Unlimited Todos</p>
                        </li>

                </ul>


                <Button className='w-3/4'>Get Started</Button>
             
            </div>


            <div className='bg-slate-950 rounded-2xl text-white flex flex-col items-center px-2 py-8 w-full max-w-lg md:py-10 gap-8   '>

           
<div className='text-center '>                
<p className='font-bold text-xl'>Playground</p>
<p className=''>Free Edition</p>
</div>   

<div className='flex justify-center items-center gap-2'>
   <p className='font-bold text-5xl '>£1</p>
   <p>per Month</p>
</div>


<Divider className='bg-gray-300 w-3/4'/>



<ul className='flex flex-col gap-2'>
   <li className='flex gap-2 mt-6'>
       <Image src={TickIcon}></Image>
       <p> Unlimited Todos</p>
       </li>
       <li className='flex gap-2'>
       <Image src={TickIcon}></Image>
       <p> Unlimited Todos</p>
       </li> <li className='flex gap-2'>
       <Image src={TickIcon}></Image>
       <p> Unlimited Todos</p>
       </li> <li className='flex gap-2'>
       <Image src={TickIcon}></Image>
       <p> Unlimited Todos</p>
       </li>

</ul>


<Button className='w-3/4'>Subscribe Now</Button>

</div>

  



        </div>



    </div>
  )
}

export default PricingSection