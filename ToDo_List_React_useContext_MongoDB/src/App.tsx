import './App.css'
import Header from './Header/Header'
import axios from "axios";
import Input from './Input/Input';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext } from 'react';
import ListOfTasks from './ListOfTasks/ListOfTasks';
import 'react-toastify/dist/ReactToastify.css';

type Task = {
  title:string;
  __v: number;
  _id: string
}
export const DataContext = createContext<Task[]>([]);

const getAllTasks = async () => {
  const { data } = await axios.get('http://localhost:3004/tasks')
  return data
}

const App = ()  => {

  const queryClient = useQueryClient();  

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
            <ListOfTasks />
          </DataContext.Provider>,
      </div>
  )
}

export default App






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