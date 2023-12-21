/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrag } from "react-dnd";
const TaskRow = ({task, idx}) => {
    const [{isDragging}, drag] = useDrag(()=>({
        type: "task",
        collect: (monitor)=> ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    return(
        <tr ref={drag} style={{border: isDragging ? "5px solid pink" : "0px"}}>
        <th>{idx+1}</th>
        <td>{task?.title}</td>
        <td>{task?.description}</td>
        <td>{task?.priority}</td>
        <td>{task?.deadline}</td>
      </tr>
    )}
export default TaskRow;