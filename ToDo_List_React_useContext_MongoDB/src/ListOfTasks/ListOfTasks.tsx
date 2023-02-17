import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../App";
import styles from './ListOfTasks.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListOfTasks = () => {
    
    const notify = () => toast("Post deleted!");

    const data= useContext(DataContext);
    console.log('data in list', data)

    const queryClient = useQueryClient();  

    const deletePost = useMutation((id:string) => {
      return axios.delete(`http://localhost:3004/tasks/${id}` );
    });

    queryClient.invalidateQueries(['tasks']);

    return (
        <div>
            <div className='taskList'>
              {data.map(({_id, title, __v}) => (
                <div className='singleTask' key={_id}>
                  <p>{title}</p>
                  <button 
                  className={styles.button_91}
                  role="button"
                  onClick={() => {deletePost.mutate(_id); notify()}}
                  >✓</button>
                </div>
              ))}
            </div><ToastContainer />
        </div>
    )
  
}
export default ListOfTasks;