/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrag } from "react-dnd";

interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
  }
interface TaskRowProps {
    idx: number;
    task: Task
  }
const TaskRow:React.FC<TaskRowProps>= ({task, idx}) => {
    const [{isDragging}, drag] = useDrag(()=>({
        type: "task",
        item: {id: task?._id, toDo: "toDo"},
        collect: (monitor)=> ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return(
        <tr ref={drag} style={{border: isDragging ? "5px solid pink" : "0px"}}>
        <th>{idx+1}</th>
        <td className="font-medium">{task?.title}</td>
        <td>{task?.description}</td>
        <td className={task?.priority==="low" ? "text-green-600" : task?.priority==="high" ? "text-red-600" : "text-yellow-600"}>{task?.priority}</td>
        <td>{task?.deadline}</td>
      </tr>
    )}
export default TaskRow;