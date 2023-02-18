import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react'
import styles from '../ListOfTasks/ListOfTasks.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Task = {
    title:string;
    __v: number;
    _id: string
}
export default function Input() {
  const notify = () => toast("Post added!");

  const queryClient = useQueryClient();
  queryClient.invalidateQueries(['tasks']);

    const [taskTitle, setTaskTitle] = useState('')

    const addNewTaskElement = async (task:{ taskTitle: string; }) => {     
        return axios.post('http://localhost:3004/add', task);
    }

    const useNewTaskData = ( )=>{
        return useMutation(addNewTaskElement);
    }

    const { mutate } = useNewTaskData();

    const onSubmit = (e: { preventDefault: () => void }) => {        
        e.preventDefault()
        setTaskTitle('')
        let task:{ taskTitle: string; } = {taskTitle}
        mutate(task);
        console.log(taskTitle)
        setTaskTitle('')
    }

  queryClient.invalidateQueries(['tasks']);

  return (
    <div>
      <form  onSubmit={onSubmit}>
        <label>
            <input type="text" 
            name="name" 
            value={taskTitle}
            placeholder='What needs to be done?'
            onChange={(e)=>setTaskTitle(e.target.value)} 
            required/>
        </label>
        <input type="submit" value=" Add " className={styles.button_91} onClick={notify}/>
      </form>
      <ToastContainer />
    </div>
  )
}
