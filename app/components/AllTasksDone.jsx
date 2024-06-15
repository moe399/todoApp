import React from 'react'
import Lottie from 'react-lottie'
import animationData from "../todo/assets/lottieHero.json"

function AllTasksDone(props) {

    const defaultOptions = {

        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }

    }


  return (
    <div className='bg-neutral-900  flex flex-col items-center justify-center rounded-2xl opacity-80  gap-0 pt-4 '>

      {props.doneNumberTodos == 0 && props.notDoneNumberTodos == 0 && props.loaded == true ? (

      <p className="text-white text-lg py-6">Welcome, start by adding a task above :)</p>
      ) : (


      <>
      <p className="text-white text-lg">Good Job! All Tasks Done :)</p>
        <Lottie options={defaultOptions} height={150} width={100}  ></Lottie>
        </>

      )}
     


    </div>
  )
}

export default AllTasksDone