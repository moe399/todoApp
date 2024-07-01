import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { Button, useCode } from "@nextui-org/react";
import TickIconComp from "../components/TickIconComp";
import TrashIconComp from "../components/TrashIconComp";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { TodosContext } from "../lib/contexts/TodoContext";

export default function Task(props) {
  const [tickLoading, setTickLoading] = useState(false);
  const { width, height } = useWindowSize();

  const [numberOfConfetti, setNumberOfConfetti] = useState(0);

  const { markCompleted, deleteTask } = useContext(TodosContext);

  async function handleMarkComplete() {
    // let outputOfFunction = await markCompleted(props.id)

    

    if ((await markCompleted(props.id)) == true) {

      props.handleShowConfetti();

      setTickLoading(false);
    } else {

      setTickLoading(false);
    }
  }


  async function handleDelete(){


    
    if ((await deleteTask(props.id)) == true) {


      setTickLoading(false);
    } else {

      setTickLoading(false);
    }



  }

  return (
    <div className="flex items-center w-full justify-between bg-[#15101C] py-4 px-3 rounded-lg">
      <p className="text-white text-md lg:text-lg">
        {window.innerWidth < 570 && props.name.length > 30
          ? props.name.slice(0, 30) + "..."
          : props.name.length > 60
          ? props.name.slice(0, 55) + "..."
          : props.name}
      </p>

      <div className="flex gap-2 ">
        <Button
          isLoading={tickLoading}
          isIconOnly
          className="bg-transparent text-white"
          onClick={handleMarkComplete}
        >
          <TickIconComp />
        </Button>
        <Button isIconOnly className="bg-transparent" onClick={handleDelete}>
          <TrashIconComp />
        </Button>

        {/* <Image src={TrashIcon}/> */}
      </div>

      <Confetti
        initialVelocityY={8}
        numberOfPieces={numberOfConfetti}
        width={width}
        height={height}
      ></Confetti>
    </div>
  );
}
