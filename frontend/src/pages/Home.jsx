import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Task from "../components/Task";
import Header from "../components/header";

const Home = () => {
  const { user } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use sessionStorage if needed
        },
      });

      console.log("Tasks:", response.data);
      return response.data; // Return tasks for further use
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response ? error.response.data : error
      );
      return []; // Return empty array on error
    }
  }

  useEffect(() => {
    async function fetchData() {
      const tasksData = await getTasks();
      setTasks(tasksData);
    }

    fetchData();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message); // You can show a success message
      // Update the tasks state by filtering out the deleted task
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="bg-gradient-to-b from-slate-200 to-cyan-50 flex-1">
        <div className="min-w-full p-8 md:py-10 md:min-w-3/5 md:max-w-1/2 mx-auto">
          <div className="p-3">
            <h3 className="font-black text-2xl pb-2">Hello, {user?.name}!</h3>
            <p className="text-sm text-gray-600">
              Welcome back to your task management dashboard. Let's get started!
            </p>
          </div>
          <ul className="list bg-base-100 rounded-box shadow-md">
            <div className="p-4 pb-2 text-xs w-full flex justify-between items-center py-8">
              <h3 className="text-lg font-bold px-5 opacity-50">Tasks</h3>
              <button
                className="btn btn-success"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Task
              </button>
            </div>

            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Task
                  key={task.id}
                  id={task.id} // Task ID
                  taskNumber={index + 1} // Adding task number
                  name={task.name}
                  status={task.completed ? "Completed" : "Pending"} // Task status
                  assignee={task.assignee.name} // Assigned user (e.g., Percy Michael)
                  description={task.description} // Task description
                  dueDate={task.due_date} // Expected completion date
                  deleteTask={deleteTask} // Pass deleteTask as a prop
                />
              ))
            ) : (
              <li className="list-row">No tasks found</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
