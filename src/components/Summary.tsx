import { Task } from "../store/slice/tasksSlice";

const Summary = ({ tasks }: { tasks: Task[] }) => {
  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="mb-4 text-sm font-bold flex w-full items-center justify-between py-6">
      <p className="text-[#4EA8DE]">Tasks:{" "}
        <span className="bg-[#333333] text-white px-4 py-2 rounded-full text-md">
         {tasks.length}
        </span>
      </p>
      <p className="text-[#8284FA]">
        Completed:{" "}
        <span className="bg-[#333333] text-white px-4 py-2 rounded-full text-md">
          {completed} of {tasks.length}
        </span>
      </p>
    </div>
  );
};

export default Summary;
