import './App.css'
import Header from './Header/Header'
import axios from "axios";
import Input from './Input/Input';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from 'react';
import ListOfTasks from './ListOfTasks/ListOfTasks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<ToastContainer />
type Task = {
  title:string;
  __v: number;
  _id: string
}
export const DataContext = createContext({});
const getAllTasks = async () => {
  const { data } = await axios.get('http://localhost:3004/tasks')
  return data
}

const App = ()  => {

  const queryClient = useQueryClient();  

  // const deletePost = useMutation((id:string) => {
  //   return axios.delete(`http://localhost:3004/tasks/${id}` );
  // });

  const { data, isLoading } = useQuery<Task[]>(['tasks'],() => getAllTasks())

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!data) {
    return <h1>Something went wrong...</h1>
  }

  queryClient.invalidateQueries(['tasks']);

  return (

      <div className="App">
          <DataContext.Provider value={data}>
            <Header />
            <h1>My To Do List</h1>
            <Input /> 
            {/* <div className='taskList'>
              {data.map(({_id, title, __v}) => (
                <div className='singleTask' key={_id}>
                  <p>{title}</p>
                  <button
                  onClick={() => {deletePost.mutate(_id)}}
                  >✓</button>
                </div>
              ))}
            </div> */}
                <ListOfTasks />
            </DataContext.Provider>,
      </div>
  )
}

export default App

