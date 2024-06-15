import React from 'react'
import Lottie from 'react-lottie'
import animationData from "../todo/assets/lottieSleep.json"

function NoTasksDone(props) {

    const defaultOptions = {

        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }

    }


  return (

        <>
        

        {props.doneNumberTodos == 0 && props.notDoneNumberTodos == 0 && props.loaded == true ? (

<></>
) : (


    <div className='bg-neutral-900  flex flex-col items-center justify-center rounded-2xl opacity-80  gap-0 pt-4 '>
<p className="text-white text-lg">Let's start ticking off tasks</p>
  <Lottie options={defaultOptions} height={150} width={100}  ></Lottie>
  </div>

)}

</>

  )

}

  


export default NoTasksDone