/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrag } from "react-dnd";

interface Task {
    _id: string;
    title: string;
    description: string;
    priority: string;
    deadline: string;
  }
interface CompleteTaskRow {
    idx: number;
    task: Task
  }
const CompleteTaskRow:React.FC<CompleteTaskRow>= ({task, idx}) => {
    const [{isDragging}, drag] = useDrag(()=>({
        type: "task",
        item: {id: task?._id, complete: "complete"},
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
export default CompleteTaskRow;