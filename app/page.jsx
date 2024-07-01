
import { Button } from "@nextui-org/react";

import Image from "next/image";
import Hero from "./Hero";
import LargeCardSection from "./LargeCardSection";
import PricingSection from "./PricingSection";



export default function Home() {
  return (
    <main className="bg-[#141718] h-screen px-6 flex flex-col items-center overflow-x-hidden py-6 ">



    <Hero/>

    <LargeCardSection/>


    <PricingSection/>

    </main>
  );
}
