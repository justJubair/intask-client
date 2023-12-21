import { useState } from "react";
import Loader from "../Shared/Loader";
import TaskRow from "./TaskRow";


interface TaskTableProps {
  tasks: [];
  isLoading: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({tasks, isLoading}) => {
  const [onGoingTasks, setOnGoingTasks] = useState([] || null)
  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="space-y-10">
      <div className="overflow-x-auto mt-16">
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
           
           
            {
              tasks?.map((task:{_id:string, title: string, description: string, priority: string, deadline:string}, idx)=>  <TaskRow key={task._id} task={task} idx={idx}/>)
            }
           
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
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
           
           
            {/* {
              tasks?.map((task:{_id:string, title: string, description: string, priority: string, deadline:string}, idx)=>  <tr key={task?._id}>
                <th>{idx+1}</th>
                <td>{task?.title}</td>
                <td>{task?.description}</td>
                <td>{task?.priority}</td>
                <td>{task?.deadline}</td>
              </tr>)
            }
            */}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto pb-16">
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
           
           
            {
              tasks?.map((task:{_id:string, title: string, description: string, priority: string, deadline:string}, idx)=>  <tr key={task?._id}>
                <th>{idx+1}</th>
                <td>{task?.title}</td>
                <td>{task?.description}</td>
                <td>{task?.priority}</td>
                <td>{task?.deadline}</td>
              </tr>)
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TaskTable;
