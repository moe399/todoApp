import { useState, useContext, createContext, useEffect } from "react";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import pocketBase from "../pocketbase";


export const UserContext = createContext();
export default function UserContextProivder({ children }) {
  const API_BASE_URL = "http://127.0.0.1:8090";

  const [userDetails, setUserDetails] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {

    console.log("isAuth has changed: " + isAuth);


  }, [isAuth])

  async function login(data) {


      if (data != null) {
        const dataToSend = {
          identity: data.username,
          password: data.password,
        };

        
    const authData = await pocketBase.collection('users').authWithPassword(
  data.username,
  data.password,
    );

    authData


    console.log(pocketBase.authStore.isValid);
console.log(pocketBase.authStore.token);
console.log(pocketBase.authStore.model.id);




      //  await axios
      //     .post(
      //       `${API_BASE_URL}/api/collections/users/auth-with-password`,
      //       dataToSend
      //     )
      //     .then((res) => {
      //       setIsAuth(true);
      //       setUserDetails(res.data.record);
      //       localStorage.setItem("token", res.data.token)
      //       localStorage.setItem("username", res.data.record.username )
      //       localStorage.setItem("id", res.data.record.id )
      //       localStorage.setItem("loginState", "true");
      //       console.log("loginfunction inside then block isAuth" + isAuth)

            

      //     })
      //     .catch((e) => {
            
      //       console.log("error")
           


      //     } );

      }



    }

  function logout() {
    pocketBase.authStore.clear()
   
  }

  const value = {
    userDetails,
    setUserDetails,
    isAuth,
    setIsAuth,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
