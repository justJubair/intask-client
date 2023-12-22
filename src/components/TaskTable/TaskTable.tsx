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

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   priority: string;
//   deadline: string;
// }

const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading, refetch }) => {
  // const [onGoingTasks, setOnGoingTasks] = useState<Task[]>([])
  // const [completeTasks, setCompleteTasks] = useState<Task[]>([])
  const { user } = useAuth();

  const {data:onGoingTasks, isLoading:onGoingTasksLoading, refetch:onTaskRefetch}= useQuery({
    queryKey: [user, "onGoingTasks"],
    queryFn: async()=>{
      const res = await axios(`http://localhost:5000/onGoingTasks?userEmail=${user?.email}`)
      return res.data
    }
  })
  const {data:completeTasks, isLoading:completeTasksLoading, refetch:completeRefetch}= useQuery({
    queryKey: [user, "completeTasks"],
    queryFn: async()=>{
      const res = await axios(`http://localhost:5000/completeTasks?userEmail=${user?.email}`)
      return res.data
    }
  })

  console.log(completeTasks)



  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => shiftToOnGoing(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  const [, dropComplete] = useDrop(() => ({
    accept: "task",
    drop: (item) => shiftToComplete(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

 

  const shiftToOnGoing = async (item:{toDo:string | null, id: string}) => {
   
    try {
      if(item?.toDo){

        const resTodo = await axios(
          `http://localhost:5000/tasks?userEmail=${user?.email}`
        );
        const selected = resTodo?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("http://localhost:5000/onGoingTasks", selected)
        if(postRes?.data?.insertedId){
          onTaskRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`http://localhost:5000/tasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
              refetch()
           }
        }
      } else {
        const resComplete = await axios(
          `http://localhost:5000/completeTasks?userEmail=${user?.email}`
        );
        const selected = resComplete?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("http://localhost:5000/onGoingTasks", selected)
        if(postRes?.data?.insertedId){
          onTaskRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`http://localhost:5000/completeTasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            completeRefetch()
           }
        }
      }
      
  
        
    } catch (err) {
      console.log(err);
    }
  };


  const shiftToComplete = async (item) => {
  
    try {
      if(item?.toDo){

        const resTodo = await axios(
          `http://localhost:5000/tasks?userEmail=${user?.email}`
        );
        const selected = resTodo?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("http://localhost:5000/completeTasks", selected)
        if(postRes?.data?.insertedId){
          completeRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`http://localhost:5000/tasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
              refetch()
           }
        }
      } else if(item?.onGoing) {
        const resComplete = await axios(
          `http://localhost:5000/onGoingTasks?userEmail=${user?.email}`
        );
        const selected = resComplete?.data?.find(
          (task: { _id: string }) => task?._id === item.id
        );
          delete selected._id
        const postRes = await axios.post("http://localhost:5000/completeTasks", selected)
        if(postRes?.data?.insertedId){
          completeRefetch()
         
              // delete the task from main list
           const deleteRes = await axios.delete(`http://localhost:5000/onGoingtasks/${item.id}`)
           if(deleteRes.data.deletedCount> 0){
            onTaskRefetch()
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
      <div className="overflow-x-auto mt-16" >
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
