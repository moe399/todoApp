import Pocketbase from 'pocketbase'


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


  const pb = new Pocketbase(API_BASE_URL);
  

  //   async function getTodos() {

  //     // await new Promise(resolve => setTimeout(resolve, 3000))

  //     const headers = {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem("token")}`
  //       };

  //     await axios
  //       .get(
  //         `${API_BASE_URL}/api/collections/todo/records?filter=(user='${localStorage.getItem(
  //           "id"
  //         )}')`, {headers},

  //       )
  //       .then((res) => {
  //         setDoneTodos(res.data.items);
  //         setNumberOfTodos(res.data.totalItems);
  //         // console.log(res.data)
  //         // console.log(`REQUESTS + ${API_BASE_URL}/api/collections/todo/records?filter=(user='${localStorage.getItem(
  //         //     "id"
  //         //   )}')`)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //   }

  // Todos that are NOT done
  async function getNotDoneTodos() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    await axios
      .get(
        `${API_BASE_URL}/api/collections/todo/records?filter=%28user%3D%27${localStorage.getItem(
          "id"
        )}%27%26%26done%3Dfalse%29`,
        { headers }
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
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    await axios
      .get(
        `${API_BASE_URL}/api/collections/todo/records?filter=%28user%3D%27${localStorage.getItem(
          "id")}%27%26%26done%3Dtrue%29`,{ headers }
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


    



  }

   async function markCompleted(id) {
   

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    deleteTask
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
