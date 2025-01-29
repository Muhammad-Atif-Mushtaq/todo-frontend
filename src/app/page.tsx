"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; 
import { fetchTasks } from "../store/slice/tasksSlice"; // Import the fetchTasks thunk
import TaskCard from "../components/TaskCard";
import Summary from "../components/Summary";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to ensure proper typing
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTasks()); // Dispatch the thunk to fetch tasks
  }, [dispatch]);

  const handleClick = () => {
    router.push("/create");
  };

  return (
    <>
      <motion.div
        className="flex flex-col w-full h-[100px] relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={handleClick}
          className="font-sans flex items-center bg-[#1E6F9F] p-[16px] justify-center gap-1 w-1/2 mx-auto rounded-[8px] text-lg hover:bg-blue-600 hover:shadow-sm hover:shadow-blue-500 absolute top-0 -translate-y-[55%] left-[50%] -translate-x-[50%]"
        >
          <span>Create Task{" "}</span>
          <Image width={16} height={16} src="/plus.svg" alt="logo" />
        </button>
      </motion.div>

      <motion.div
        className="flex flex-col mx-auto w-full px-2 md:px-0 md:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          <Summary tasks={tasks} />
        </motion.div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
          >
            Loading tasks...
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            className="text-red-500"
          >
            Error: {error}
          </motion.p>
        )}

        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {tasks.length ? (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))
          ) : (
            <div className="py-16 px-6 flex flex-col justify-center items-center w-full gap-4 border-t border-t-[#333333] rounded-t-[16px]">
              <img src="/Clipboard.svg" alt="My Icon" />
              <p className="text-[#808080]">You don't have any tasks registered yet.</p>
              <p className="text-[#808080]">Create tasks and organize your to-do items.</p>
            </div>
            
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
