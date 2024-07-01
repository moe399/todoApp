'use client'


import Image from 'next/image'
import React from 'react'
import app1 from "./assets/app_1.png"
import app2 from "./assets/app_2.png"
import app3 from "./assets/app_3.png"
import app4 from "./assets/app_4.png"


function LargeCardSection() {
  return (
    <div className='text-white py-10 flex flex-col items-center gap-8'>

     <div className='flex flex-col gap-4 items-center'>
    <p className='font-roboto text-2xl font-bold text-center '>Unlike any todo tool you've ever encountered</p>
    <p className='text-center text-gray-400'>A Simple UI to do the things most important, ticking off tasks!</p>

    </div>


    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>


    <div className='bg-[#232627] px-4 py-6 flex flex-col rounded-xl gap-4 w-70 max-w-xl max-h-md'>

    <Image src={app1} className='rounded-2xl h-96 backdrop-blur-lg'/>

    <p className='font-bold'>Quotes to remind you why you started</p>
    <p className='text-xs text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio animi excepturi ea, dolorem iusto labore est nemo? </p>
    </div>


   




    <div className='bg-[#232627] px-4 py-6 flex flex-col rounded-xl gap-4 w-70  max-w-xl '>

    <Image src={app2} className='rounded-2xl backdrop-blur-xl'/>

    <p className='font-bold'>Positive Reinforcement</p>
    <p className='text-xs text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio animi excepturi ea, dolorem iusto labore est nemo? </p>
    </div>


 





    <div className='bg-[#232627] px-4 py-6 flex flex-col rounded-xl gap-4 w-70 max-w-xl '>

    <Image src={app3} className='rounded-2xl backdrop-blur-lg'/>

    <p className='font-bold'>Some More Positive Reinforcement :)</p>
    <p className='text-xs text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio animi excepturi ea, dolorem iusto labore est nemo? </p>
    </div>


   




    <div className='bg-[#232627] px-4 py-6 flex flex-col rounded-xl gap-4 w-70  max-w-xl '>

    <Image src={app4} className='rounded-2xl backdrop-blur-lg '/>

    <p className='font-bold'>Simple and easy to use UI</p>
    <p className='text-xs text-gray-400'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio animi excepturi ea, dolorem iusto labore est nemo? </p>
    </div>


    </div>

</div>

  )
}

export default LargeCardSection