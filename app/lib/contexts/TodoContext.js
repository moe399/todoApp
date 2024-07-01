import pocketBase from "../pocketbase";



const { default: axios } = require("axios");
const { useState, createContext, Children } = require("react");

export const TodosContext = createContext();

export default function TodoContextProvider({ children }) {
  const [doneTodos, setDoneTodos] = useState();
  const [notDoneTodos, setNotDoneTodos] = useState();
  const [notDoneNumberTodos, setNotDoneNumberTodos] = useState();
  const [doneNumberTodos, setDoneNumberTodos] = useState();
  const [loaded, setLoaded] = useState(false);
  const [addLoading, setAddLoading] = useState(false)


  const API_BASE_URL = process.env.apiBaseUrl;






  async function getNotDoneTodos() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pocketBase.authStore.token}`,
    };


    const filterParas = encodeURIComponent(`done=false&&user='${pocketBase.authStore.model.id}'`)
    

    await axios
      .get(
        `${API_BASE_URL}/api/collections/todo/records?filter=(${filterParas})`,{ headers }
      )
      .then((res) => {

        setNotDoneTodos(res.data.items);
        setNotDoneNumberTodos(res.data.totalItems);
     
      })
      .catch((error) => {
      });
  }








  async function getDoneTodos() {



    // Check solution for encoded username string 


    const filterParas = encodeURIComponent(`done=true&&user='${pocketBase.authStore.model.id}'`)



  //  await http.get(`/api/collections/settings/records?filter=(${filterParas })`, {...})


    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pocketBase.authStore.token}`,
    };

    await axios
      .get(
        `${API_BASE_URL}/api/collections/todo/records?filter=(${filterParas})`,{ headers }
      )
      .then((res) => {

        setDoneTodos(res.data.items);
        setDoneNumberTodos(res.data.totalItems);
     
      })
      .catch((error) => {
      });
  }


  async function createTask(name){


    setAddLoading(true)

    try{


    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pocketBase.authStore.token}`,
    };

    const data = {
      "title" : name,
      "user": pocketBase.authStore.model.id
    }


    await axios.post(`${API_BASE_URL}/api/collections/todo/records`, data, {headers})
    .then((res) => {
    })

    setAddLoading(false)


    await getDoneTodos()
    await getNotDoneTodos()

    
  }


  catch(e){
    setAddLoading(false)
  }



  }

   async function markCompleted(id) {
   

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pocketBase.authStore.token}`,
    };



    const data = {
      done: true,
    };

    try{

        const res =  await axios.patch(`${API_BASE_URL}/api/collections/todo/records/${id}`, data, headers)

        if(res.status === 200){

            await getDoneTodos()
            await getNotDoneTodos()
            return true;


        }
 

        else{
            console.error(`Unexpected status code: ${res.status}`);
            return false;
        }

    }

    catch (error) {
        console.error("ERROR", error);
        return false;
    }
    


  }

  async function deleteTask(id) {


    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pocketBase.authStore.token}`,
      };
  
          
      try{
  
          const res =  await axios.delete(`${API_BASE_URL}/api/collections/todo/records/${id}`, headers)
  
          if(res.status === 204){
  
              await getDoneTodos()
              await getNotDoneTodos()
              return true;
  
          }
  
          else{
              console.error(`Unexpected status code: ${res.status}`);
              return false;
          }
  
      }
  
      catch (error) {
          console.error("ERROR", error);
          return false;
      }

  }


  const value = {
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
    markCompleted,
    deleteTask,
    createTask,
    addLoading
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
