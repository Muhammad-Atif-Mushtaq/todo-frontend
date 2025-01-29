"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { createTaskAsync, updateTaskAsync } from "../store/slice/tasksSlice";
import { RootState, AppDispatch } from "../store/store";
import { Task } from "../store/slice/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

const TaskForm = () => {
  const searchParams = useSearchParams();
  // Get the `id` query parameter from the URL
  const taskId = searchParams.get("id");
  // Retrieve the task from Redux using the task ID
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id.toString() === taskId)
  );
 
  const router = useRouter();
 
  const dispatch = useDispatch<AppDispatch>();

  

  // Local state for the form fields
  const [title, setTitle] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Populate the form fields when the task is loaded
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSelectedColor(task.color);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !selectedColor) {
      alert("Please provide a title and select a color.");
      return;
    }

    if (taskId) {
      // Update an existing task
      const updatedTask: Task = { ...task!, title, color: selectedColor };
      await dispatch(updateTaskAsync(updatedTask));
    } else {
      // Create a new task
      const newTask: Task = {
        id: uuidv4(),
        title,
        color: selectedColor,
        completed: false,
      };
      await dispatch(createTaskAsync(newTask));
    }

    // Redirect to the home page after submission
    router.push("/");
  };

  const colors = [
    "bg-[#FF3B30]",
    "bg-[#FF9500]",
    "bg-[#FFCC00]",
    "bg-[#34C759]",
    "bg-[#007AFF]",
    "bg-[#5856D6]",
    "bg-[#AF52DE]",
    "bg-[#FF2D55]",
    "bg-[#A2845E]",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-[#4EA8DE] font-bold text-sm">Task</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full px-2 py-4 rounded bg-[#333333] rounded-[8px]"
        required
      />
      <div className="flex flex-col w-full justify-center gap-2 pb-10">
        <label className="text-[#4EA8DE] font-bold text-sm">Color</label>
        <div className="flex gap-4">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full cursor-pointer ${color} ${
                selectedColor === color ? "ring-4 ring-offset-2 ring-blue-500" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="font-sans flex items-center bg-[#1E6F9F] p-4 justify-center gap-1 mx-auto rounded-[8px] text-lg hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500 w-full"
      >
        <span>{taskId ? "Save" : "Create Task"} {" "}</span>
        {
          taskId ?
          <IoMdCheckmark /> :
          <FiPlusCircle />
        }
      </button>
    </form>
  );
};

export default TaskForm;
