import { useState, useContext, createContext, useEffect } from "react";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import pocketBase from "../pocketbase";
import { useRouter } from "next/navigation";


export const UserContext = createContext();
export default function UserContextProivder({ children }) {
  
  
  
  const API_BASE_URL = process.env.apiBaseUrl;


  const [userDetails, setUserDetails] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter()

  useEffect(() => {


    
    if(isAuth == true && pocketBase.authStore.isValid == true){

  

    }


  }, [isAuth])


 
  async function login(data) {


      if (data != null) {
        const dataToSend = {
          identity: data.username,
          password: data.password,
        };

        try{
    const authData = await pocketBase.collection('users').authWithPassword(
  data.username,
  data.password,
    );

    authData
    setIsAuth(true)
    


  }

  catch(e){
  }





      }



    }


   async function signup(data){




      
      if (data != null) {
        const dataToSend = {
          "username":data.username,
          "password" : data.password,
          "passwordConfirm": data.passwordConfirm
        }

        try{
    const record = await pocketBase.collection('users').create(dataToSend);
          router.push("/login")
 



        }

  catch(e){
  }




    }}

  function logout() {
    pocketBase.authStore.clear()
    localStorage.setItem("id", "")
    setIsAuth(false)
    
   
  }

  const value = {
    userDetails,
    setUserDetails,
    isAuth,
    setIsAuth,
    login,
    logout,
    signup
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
