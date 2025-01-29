"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateTaskAsync, deleteTaskAsync } from "../store/slice/tasksSlice";
import { AppDispatch } from "../store/store";
import { Task } from "../store/slice/tasksSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskCard = ({ task }: { task: Task }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const toggleComplete = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await dispatch(updateTaskAsync(updatedTask));
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTaskAsync(task.id));
    }
  };

  const handleEdit = () => {
    router.push(`/create?id=${task.id}`); // Redirect to `/create` with the task ID
  };

  return (
    <div className="flex justify-between p-4 bg-[#333333] rounded-md">
      <div className="flex gap-3 ">
        <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="appearance-none"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <div
        className={`w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center ${
          task.completed ? 'bg-[#8284FA] border-[#8284FA]' : 'border-[#4EA8DE]'
        }`}
      >
        {task.completed && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
    </label>
        <h3
          onClick={handleEdit} // Navigate to the edit page
          className={`cursor-pointer ${
            task.completed ? "line-through text-gray-500" : "text-white"
          }`}
        >
          {task.title}
        </h3>
      </div>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
        <RiDeleteBin6Line size={20} />
      </button>
    </div>
  );
};

export default TaskCard;
