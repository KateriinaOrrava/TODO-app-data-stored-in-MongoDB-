import './App.css'
import Header from './Header/Header'
import axios from "axios";
import Input from './Input/Input';
// import TaskList from './TaskList/TaskList';
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext } from 'react';

type Task = {
  title:string;
  __v: number;
  _id: string
}
const getAllTasks = async () => {
  const { data } = await axios.get('http://localhost:3004/tasks')
  return data
}



const App = ()  => {
  const TasksContext = createContext(null);

  const deletePost = useMutation((id:string) => {
    return axios.delete(`http://localhost:3004/tasks/${id}` );
  });

  const { data, isLoading } = useQuery<Task[]>(['tasks'],() => getAllTasks())

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <h1>Something went wrong...</h1>
    }

    console.log(data)
    console.log(data[0].title)
  return (

      <div className="App">
        <Header />
        <h1>My To Do List</h1>
        <Input /> 
        <div className='taskList'>
          {data.map(({_id, title, __v}) => (
            <div className='singleTask' key={_id}>
              <p>{title}</p>
              <button
              onClick={() => {deletePost.mutate(_id)}}
              >Delete</button>
            </div>
          ))}
        </div>
      </div>

  )
}

export default App

