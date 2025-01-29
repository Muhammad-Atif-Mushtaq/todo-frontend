"use client";
import TaskForm from "../../components/Taskform";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CreateTask = () => {
  const router = useRouter();

  return (
    <motion.div
      className="mt-[90px] px-4 md:px-0 w-full md:w-2/4 mx-auto flex flex-col gap-y-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <button onClick={() => router.push("/")}>
        <IoMdArrowBack className="text-2xl" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <TaskForm />
      </motion.div>
    </motion.div>
  );
};

export default CreateTask;
