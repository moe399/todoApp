"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Task from "./task";
import Donetask from "./donetask";
import { Button, Progress, ScrollShadow, Skeleton, Spinner } from "@nextui-org/react";
import { UserContext } from "../lib/contexts/UserContext";
import { useRouter } from "next/navigation";
import TodoContextProvider, { TodosContext } from "../lib/contexts/TodoContext";
import {useForm } from "react-hook-form";
import Confetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks";
import AllTasksDone from "../components/AllTasksDone";
import NoTasksDone from "../components/NoTasksDone";
import pocketBase from "../lib/pocketbase";


export default function page() {
  const [progessValue, setProgessValue] = useState(60);
  const {width, height} = useWindowSize();
  

  const { userDetails, setUserDetails, isAuth, setIsAuth, login, logout } =
    useContext(UserContext);

    const [numberOfConfetti, setNumberOfConfetti] = useState(0);

    const [task, setTask] = useState("")



    const motivationalQuotes = [
      "The only way to do great work is to love what you do. – Steve Jobs",
      "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
      "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
      "Believe you can and you're halfway there. – Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
      "It always seems impossible until it's done. – Nelson Mandela",
      "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
      "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
      "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt",
      "Dream big. Start small. Act now. – Robin Sharma",
      "The journey of a thousand miles begins with one step. – Lao Tzu",
      "Every accomplishment starts with the decision to try. – John F. Kennedy",
      "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
      "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
      "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar"
    ];


    const [motivationQuoteIndex, setMotivationQuoteIndex] = useState(Math.floor(Math.random() * 15))

  const {
    doneTodos,
    setDoneTodos,
    notDoneTodos,
    setNotDoneTodos,
    doneNumberTodos,
    notDoneNumberTodos,
    getDoneTodos,
    getNotDoneTodos,
    loaded,
    setLoaded,
    createTask,
    addLoading
  } = useContext(TodosContext);

  const router = useRouter();

  function calculatePercentageCompleted(doneNumberTodos, notDoneNumberTodos) {
    let totalNumberTodos = doneNumberTodos + notDoneNumberTodos;
    if (totalNumberTodos === 0) {
      return 0; // Avoid division by zero if there are no tasks
    }
    let percentageCompleted = (doneNumberTodos / totalNumberTodos) * 100;
    return percentageCompleted;
  }


  function handleTaskChange(e){

    setTask(e.target.value)

  }

 async function handleCreateTask(){


    await createTask(task)
    setTask("")



  }

   function handleShowConfetti(){


     setNumberOfConfetti(200)
     
     setTimeout(() => {


      setNumberOfConfetti(0)

     }, 2000)

    
    

  }


  
  // implenet use effect

  useEffect(() => {
    if (pocketBase.authStore.isValid == true) {
      setIsAuth(true);
    } else {
      router.push("/login");
    }
  }, []);

  async function fetchTodos() {
    await getNotDoneTodos();
    await getDoneTodos();
    setLoaded(true);
  }

  useEffect(() => {
    fetchTodos();

  }, []);


  return (
    <main className="bg-[#0D0714] h-screen flex  flex-col items-center px-8 gap-4 lg:gap-8 overflow-hidden">
      <div className="py-10 flex h-fit gap-4 border-0 w-full md:w-1/2 justify-center">
        <input
          onChange={handleTaskChange}
          className="bg-transparent border-2 border-[#3E1671] px-2 py-2 rounded-xl text-white w-full max-w-96 "
          placeholder="Add a new task"
          value={task}
        ></input>

        <button onClick={() => handleCreateTask()} className="bg-[#9E78CF] px-3 py-1 rounded-lg text-white text-3xl">
          {addLoading == true ? <Spinner color="white"/> : "+"}
        </button>
      </div>

      {/* <Tasklist/> */}

      <div className="w-full lg:w-1/2 max-w-lg flex flex-col gap-4">
        <p className="text-white text-xl font-semibold">
          Tasks to do - {notDoneNumberTodos}
        </p>

        <ScrollShadow className="flex flex-col gap-6 h-[200px] lg:h-[250px] ">

          {/* is loaded? then loop through this*/}
          
          

          {notDoneNumberTodos >= 1 && loaded == true ? 
          
          loaded == true ? 
          
          
          (
            notDoneTodos.map((todo) => {
              return <Task handleShowConfetti={handleShowConfetti} name={todo.title} id={todo.id} />;
            })
          ) : (
            <>
              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>

              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>

              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>
            </>
          ) : <AllTasksDone doneNumberTodos={doneNumberTodos} notDoneNumberTodos={notDoneNumberTodos} loaded={loaded}/>} 
        </ScrollShadow>
      </div>

      <div className="w-full lg:w-1/2 max-w-lg flex flex-col gap-4">
        <p className="text-white text-xl font-semibold">
          Done - {doneNumberTodos}
        </p>

        <ScrollShadow className="flex flex-col gap-6 h-[80px] md:h-[150px] lg:h-[200px] ">


            {doneNumberTodos >= 1 && loaded == true ? 

            

          loaded == true ? (
            doneTodos.map((todo) => {
              return <Donetask name={todo.title} />;
            })
          ) : (
            <>
              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>

              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>

              <div className="bg-[#15101C]">
                <Skeleton
                  classNames={{
                    base: "dark:bg-transparent",
                  }}
                  className="h-10 rounded-lg"
                >
                  <p>Hello</p>
                </Skeleton>
              </div>
            </>
          ) : <NoTasksDone doneNumberTodos={doneNumberTodos} notDoneNumberTodos={notDoneNumberTodos} loaded={loaded}/>}
        </ScrollShadow>
      </div>

      <div className="w-full flex flex-col items-center gap-4 md:mt-18 max-w-96">
        <Progress
          className="max-w-md text-white"
          size="xl"
          value={calculatePercentageCompleted(
            doneNumberTodos,
            notDoneNumberTodos
          )}
          color="success"
          showValueLabel={true}
        />

        <p className="text-white text-sm  lg:text-md text-center italic">
          {motivationalQuotes[motivationQuoteIndex]}
        </p>

        <Button onClick={() => setMotivationQuoteIndex(Math.floor(Math.random() * 15))}>Refresh Quote</Button>


        <Confetti initialVelocityY={8} numberOfPieces={numberOfConfetti}  width={width} height={height}></Confetti>
      </div>
    </main>
  );
}
