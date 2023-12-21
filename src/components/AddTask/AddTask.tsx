import { useForm } from "react-hook-form";
const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-2xl mx-auto">

    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Title and Deadline */}
      <div className="flex items-center justify-center gap-4">
        <input
          placeholder="Title"
          className="input input-bordered input-secondary w-full"
          type="text"
          {...register("title")}
        />
        <input
          className="input input-bordered input-secondary w-full"
          type="date"
          {...register("deadline")}
        />
      </div>
      {/* Description and Priority */}
      <div className="flex items-center justify-center gap-4">
        <input
          placeholder="Description"
          className="input input-bordered input-secondary w-full"
          type="text"
          {...register("description")}
        />
        <select
          defaultValue="default"
          className="select select-secondary w-full"
          {...register("priority")}
        >
          <option disabled value="default">
            Priority
          </option>
          <option value="female">Low</option>
          <option value="male">Moderate</option>
          <option value="other">High</option>
        </select>
      </div>

     <div className="flex justify-center">
     <button className=" btn btn-block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none" type="submit">Add Task</button>
     </div>

    </form>
    </div>
  );
};
export default AddTask;
