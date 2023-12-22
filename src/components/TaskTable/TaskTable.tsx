import axios from "axios";
import Loader from "../Shared/Loader";
import ToDoTaskRow from "./ToDoTaskRow";
import { useDrop } from "react-dnd";
import useAuth from "../../hooks/useAuth";

import OnGoinTaskRow from "./OnGoingTaskRow";

import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";
import CompleteTaskRow from "./CompleteTaskRow";

interface TaskTableProps {
  tasks: [];
  isLoading: boolean;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>;
}


const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading, refetch }) => {

  const { user } = useAuth();

  const {data:onGoingTasks, isLoading:onGoingTasksLoading, refetch:onTaskRefetch}= useQuery({
    queryKey: [user, "onGoingTasks"],
    queryFn: async()=>{
      const res = await axios(`https://intask-server.vercel.app/onGoingTasks?userEmail=${user?.email}`)
      return res.data
    }
  })
  const {data:completeTasks, isLoading:completeTasksLoading, refetch:completeRefetch}= useQuery({
    queryKey: [user, "completeTasks"],
    queryFn: async()=>{
      const res = await axios(`https://intask-server.vercel.app/completeTasks?userEmail=${user?.email}`)
      return res.data
    }
  })




  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item:{toDo:string, id:string}) => shiftToOnGoing(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  const [, dropComplete] = useDrop(() => ({
    accept: "task",
    drop: (item:{toDo:string, id:string}) => shiftToComplete(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [, dropTodo] = useDrop(() => ({
    accept: "task",
    drop: (item:{onGoing:string, id:string}) => shiftToDo(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

 

  const shiftToOnGoing = async (item:{toDo:string, id:string}) => {
   
    try {
      if(item?.toDo){

        const resTodo = await axios(
          `https://intask-server.vercel.app/tasks?userEmail=${user?.email}`
        );
        const selected = resTodo?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/onGoingTasks", selected)
        if(postRes?.data?.insertedId){
          onTaskRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/tasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
              refetch()
           }
        }
      } else {
        const resComplete = await axios(
          `https://intask-server.vercel.app/completeTasks?userEmail=${user?.email}`
        );
        const selected = resComplete?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/onGoingTasks", selected)
        if(postRes?.data?.insertedId){
          onTaskRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/completeTasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            completeRefetch()
           }
        }
      }
      
  
        
    } catch (err) {
      console.log(err);
    }
  };


  const shiftToComplete = async (item:{toDo:string, id:string}) => {
  
    try {
      if(item?.toDo){

        const resTodo = await axios(
          `https://intask-server.vercel.app/tasks?userEmail=${user?.email}`
        );
        const selected = resTodo?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/completeTasks", selected)
        if(postRes?.data?.insertedId){
          completeRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/tasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
              refetch()
           }
        }
      } else {
        const resComplete = await axios(
          `https://intask-server.vercel.app/onGoingTasks?userEmail=${user?.email}`
        );
        const selected = resComplete?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/completeTasks", selected)
        if(postRes?.data?.insertedId){
          completeRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/onGoingtasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            onTaskRefetch()
           }
        }
      }
      
  
        
    } catch (err) {
      console.log(err);
    }
  };

  // shift to TODO
  const shiftToDo = async (item:{onGoing:string, id:string}) => {
  
    try {
      if(item?.onGoing){

        const resTodo = await axios(
          `https://intask-server.vercel.app/onGoingTasks?userEmail=${user?.email}`
        );
        const selected = resTodo?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/tasks", selected)
        if(postRes?.data?.insertedId){
         refetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/onGoingtasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            onTaskRefetch()
           }
        }
      } else {
        const resComplete = await axios(
          `https://intask-server.vercel.app/completeTasks?userEmail=${user?.email}`
        );
        const selected = resComplete?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("https://intask-server.vercel.app/tasks", selected)
        if(postRes?.data?.insertedId){
          refetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`https://intask-server.vercel.app/completeTasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            completeRefetch()
           }
        }
      }
      
  
        
    } catch (err) {
      console.log(err);
    }
  };


  if (isLoading || onGoingTasksLoading || completeTasksLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-10">
      <div className="overflow-x-auto mt-16" ref={dropTodo}
      >
        <h1 className="text-center  font-bold text-2xl">To Do</h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map(
              (
                task: {
                  _id: string;
                  title: string;
                  description: string;
                  priority: string;
                  deadline: string;
                },
                idx
              ) => (
                <ToDoTaskRow key={task._id} task={task} idx={idx} />
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto" ref={drop}>
        <h1 className="text-center  font-bold text-2xl">On Going</h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
       
            {
              onGoingTasks?.map((task:{_id:string, title: string, description: string, priority: string, deadline:string}, idx:number)=>  <OnGoinTaskRow key={task?._id} task={task} idx={idx}/>)
            }
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto pb-16" ref={dropComplete}>
        <h1 className="text-center  font-bold text-2xl">Completed</h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {completeTasks?.map(
              (
                task: {
                  _id: string;
                  title: string;
                  description: string;
                  priority: string;
                  deadline: string;
                },
                idx:number
              ) => (
               <CompleteTaskRow key={task?._id} task={task} idx={idx}/>
              )
            )}


          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TaskTable;
