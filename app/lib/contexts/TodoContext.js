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


  const API_BASE_URL = "http://127.0.0.1:8090";






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
        // console.log(res.data)
        // console.log(`REQUESTS + ${API_BASE_URL}/api/collections/todo/records?filter=(user='${localStorage.getItem(
        //     "id"
        //   )}')`)
      })
      .catch((error) => {
        console.log(error);
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
        // console.log(res.data)
        // console.log(`REQUESTS + ${API_BASE_URL}/api/collections/todo/records?filter=(user='${localStorage.getItem(
        //     "id"
        //   )}')`)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  async function createTask(name){


    try{

    console.log("Passed in create function name" + name)

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
      console.log(res)
    })


    await getDoneTodos()
    await getNotDoneTodos()

    
  }


  catch(e){

    console.log(e)
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

  console.log("notDoneTodos " + notDoneTodos);

  //    setLoaded(true)
  //http://localhost:8090/api/collections/todo/records?filter=(user='42mlbpr6nj1l50e')

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
    createTask
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
