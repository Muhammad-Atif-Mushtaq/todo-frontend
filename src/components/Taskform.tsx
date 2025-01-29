// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { createTaskAsync, updateTaskAsync } from "../store/slice/tasksSlice";
// import { AppDispatch } from "../store/store";
// import { Task } from "../store/slice/tasksSlice";
// import { FiPlusCircle } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";

// const TaskForm = ({ task }: { task?: Task }) => {
//   const [title, setTitle] = useState(task?.title || "");
//   const [selectedColor, setSelectedColor] = useState(task?.color || "");
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!title || !selectedColor) {
//       alert("Please provide a title and select a color.");
//       return;
//     }

//     if (task) {
//       // Update existing task
//       const updatedTask: Task = {
//         ...task,
//         title,
//         color: selectedColor,
//       };

//       await dispatch(updateTaskAsync(updatedTask));
//     } else {
//       // Create new task
//       const newTask = {
//         id: uuidv4(),
//         title,
//         color: selectedColor,
//         completed: false,
//       };

//       await dispatch(createTaskAsync(newTask));
//     }

//     router.push("/"); // Redirect to the home or tasks list page after submission
//   };

//   const colors = ["bg-blue-500", "bg-yellow-500", "bg-orange-500", "bg-indigo-500", "bg-red-500", "bg-green-500"];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <label className="text-[#4EA8DE] font-bold text-sm" >Task</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Task Title"
//         className="w-full px-2 py-4 rounded bg-[#333333] rounded-[8px]"
//         required
//       />
//       <div className="flex flex-col w-full justify-center gap-2">
//         <label className="text-[#4EA8DE] font-bold text-sm" >Color</label>
//         <div className="flex w-full gap-4">
//           {colors.map((color) => (
//             <div
//               key={color}
//               onClick={() => setSelectedColor(color)}
//               className={`w-10 aspect-square rounded-full cursor-pointer ${
//                 selectedColor === color
//                   ? "ring-4 ring-offset-2 ring-blue-500"
//                   : ""
//               } ${color}`}
//             ></div>
//           ))}
//         </div>
//       </div>
//        <button
//           type="submit"
//           className="font-sans flex items-center bg-[#1E6F9F] p-4 justify-center gap-1 mx-auto rounded-[8px] text-lg hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500 w-full"
//               >
//           <span>{task ? "Update Task" : "Create Task"}{" "}</span>
//           <FiPlusCircle />
//       </button>
//     </form>
//   );
// };

// export default TaskForm;


"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { createTaskAsync, updateTaskAsync } from "../store/slice/tasksSlice";
import { RootState, AppDispatch } from "../store/store";
import { Task } from "../store/slice/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { FiPlusCircle } from "react-icons/fi";

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
    "bg-blue-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-green-500",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-[#4EA8DE] font-bold text-sm">Task</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        required
      />
      <div>
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
        className="bg-blue-600 p-3 rounded text-white flex items-center gap-2"
      >
        <span>{taskId ? "Update Task" : "Create Task"}</span>
        <FiPlusCircle />
      </button>
    </form>
  );
};

export default TaskForm;
