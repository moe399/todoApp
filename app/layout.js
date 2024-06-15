'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import UserContextProivder from "./lib/contexts/UserContext";
import TodoContextProvider from "./lib/contexts/TodoContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className="overflow-y-auto">
        
        <UserContextProivder>
        <TodoContextProvider>
        <Navbar/>
        <Suspense>
        {children}
        </Suspense>
        </TodoContextProvider>
        </UserContextProivder>
      
        </body>
    </html>
  );
}
