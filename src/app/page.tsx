"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/Components/Header";
import Button from "@/Components/Button";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Page() {
  const [Task, setTask] = useState("");
  const [mainTask, setMainTask] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setMainTask(JSON.parse(storedTasks));
    }
    setLoading(false);
  }, []);

  const updateLocalStorage = (tasks: any) => {
    // Save tasks to localStorage whenever there is a change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const SubmitHandler = (e: any) => {
    e.preventDefault();
    if (Task.length === 0) {
      toast.error(" Add Your Todo !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const updatedTasks = [...mainTask, { Task }];
    setMainTask(updatedTasks);
    setTask("");
    updateLocalStorage(updatedTasks);
  };

  const DeleteHandler = (i: any) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
    updateLocalStorage(copyTask);
  };

  let renderTask = <h1 className="font-semibold px-2">No task Available</h1>;

  if (mainTask.length > 0) {
    renderTask = (
      <AnimatePresence>
        {mainTask.map((t: any, i: any) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex justify-between items-center px-2"
          >
            <h1 className="py-4 px-4 font-medium italic">{t.Task}</h1>
            <Button image={<MdOutlineDelete />} func={() => DeleteHandler(i)} />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-10 mb-14 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-700 mx-4 sm:mx-8 md:mx-16 lg:mx-24 rounded-md py-8 ">
        <form onSubmit={SubmitHandler} className="w-full max-w-md">
          <input
            type="text"
            autoFocus
            value={Task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full bg-slate-50 text-black py-2 px-4 border-4 border-orange-600 mb-4 rounded-full"
            placeholder="Enter Task Here Â©resheph-inayat"
          />
          <Button image={<IoMdAdd />} func={SubmitHandler} />
          <ToastContainer />
        </form>

        <div className="w-full max-w-md mt-8 bg-gray-500 py-2 rounded-md text-black">
          {loading ? <p>Loading...</p> : <ul>{renderTask}</ul>}
        </div>
      </div>
      
    </>
  );
}
