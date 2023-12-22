import axios from "axios";
import Loader from "../Shared/Loader";
import ToDoTaskRow from "./ToDoTaskRow";
import { useDrop } from "react-dnd";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import OnGoinTaskRow from "./OnGoingTaskRow";
import CompleteTaskRow from "./CompleteTaskRow";

interface TaskTableProps {
  tasks: [];
  isLoading: boolean;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading }) => {
  const [onGoingTasks, setOnGoingTasks] = useState<Task[]>([])
  const [completeTasks, setCompleteTasks] = useState<Task[]>([])
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => shiftToOnGoing(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [, dropComplete] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => shiftToComplete(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // const [, dropTodo] = useDrop(() => ({
  //   accept: "task",
  //   drop: (item: { id: string }) => shiftToTodo(item.id, tasks),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));


  const shiftToOnGoing = async (id: string) => {
    try {
      const res = await axios(
        `http://localhost:5000/tasks?userEmail=${user?.email}`
      );
      const selected = res?.data?.find(
        (task: { _id: string }) => task?._id === id
      );
      setOnGoingTasks((onGoingTasks)=>[...onGoingTasks, selected])
        
    } catch (err) {
      console.log(err);
    }
  };
  const shiftToComplete = async (id: string) => {
    try {
      const res = await axios(
        `http://localhost:5000/tasks?userEmail=${user?.email}`
      );
      const selected = res?.data?.find(
        (task: { _id: string }) => task?._id === id
      );
      setCompleteTasks((completeTasks)=>[...completeTasks, selected])
        
    } catch (err) {
      console.log(err);
    }
  };
  // const shiftToTodo = async (id: string, tasks: Task[]) => {
  //   try {
  //     const res = await axios(
  //       `http://localhost:5000/tasks?userEmail=${user?.email}`
  //     );
  //     const selected = res?.data?.find(
  //       (task: { _id: string }) => task?._id === id
  //     );
  //     console.log(tasks)
      
   
        
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (isLoading) {
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
              onGoingTasks?.map((task:{_id:string, title: string, description: string, priority: string, deadline:string}, idx)=>  <OnGoinTaskRow key={task?._id} task={task} idx={idx}/>)
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
                idx
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
