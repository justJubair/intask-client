import { useForm } from "react-hook-form"
const AddTask = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
            console.log(data)
        }
    return(
       <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title")}/>
        <input type="text" {...register("description")}/>
       </form>
    )}
export default AddTask;