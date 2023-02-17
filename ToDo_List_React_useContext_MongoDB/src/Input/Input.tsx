import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

type Task = {
    title:string;
    __v: number;
    _id: string
}
export default function Input() {
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
        let task:{ taskTitle: string; } = {taskTitle}
        mutate(task);
        console.log(taskTitle)
        setTaskTitle('')
    }



  return (
    <div>
      <form  onSubmit={onSubmit}>
        <label>
            New Task : 
            <input type="text" 
            name="name" 
            onChange={(e)=>setTaskTitle(e.target.value)} 
            required/>
        </label>
        <input type="submit" value=" Add " />
        </form>
    </div>
  )
}
