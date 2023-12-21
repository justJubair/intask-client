
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

interface TaskFormData {
  // Define the properties of your task data
  title: string;
  deadline: string;
  description: string;
  priority: string;
  userEmail: string;
  // Add any other properties as needed
}

const AddTask = () => {
  const {user} = useAuth()
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TaskFormData>();

  const onSubmit = async(data: TaskFormData) => {
    data.userEmail = user?.email
    
    try{
        const dbResponse = await axios.post("http://localhost:5000/tasks", data)
        if(dbResponse.data.insertedId){
          toast.success("Task has been added")
          reset()
        }
    }
    catch(error: unknown){
     if(error instanceof Error){

       toast.error(error.message)
     }
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-5 text-fuchsia-600">Add A Task</h1>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Title and Deadline */}
      <div className="flex items-center justify-center gap-4">
        <input
          placeholder="Title"
          className="input input-bordered input-secondary w-full"
          type="text"
          required
          {...register("title", {required:true})}
        />
        <input
          className="input input-bordered input-secondary w-full"
          type="date"
          required
          {...register("deadline", {required:true})}
        />
      </div>
      {/* Description and Priority */}
      <div className="flex items-center justify-center gap-4">
        <input
          placeholder="Description"
          className="input input-bordered input-secondary w-full"
          type="text"
          required
          {...register("description", {required:true})}
        />
        <select
          defaultValue="low"
          required
          className="select select-secondary w-full"
          {...register("priority", {required:true})}
        >
          
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

     <div className="flex justify-center">
     <button className=" btn btn-block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none" type="submit">Add</button>
     </div>

    </form>
    </div>
  );
};
export default AddTask;
