import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Task from "../components/Task";
import Header from "../components/header";

const Home = () => {
  const { user } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showToast, setShowToast] = useState(false);

  async function getTasks() {
    try {
      const response = await axios.get("http://127.0.0.1:80/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use sessionStorage if needed
        },
      });

      // console.log("Tasks:", response.data);
      return response.data; // Return tasks for further use
    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error.response ? error.response.data : error
      );
      return []; // Return empty array on error
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:80/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Fetched Users: ", response.data); // Check the response here
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  // Fetch tasks and users on page load
  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await getTasks();
      const userData = await fetchUsers();
      console.log("Fetched User Data:", userData);
      setTasks(tasksData);
      setUsers(userData);
    };

    fetchData(); // Fetch tasks and users once on component mount
  }, []); // Empty dependency array means it runs only once on component mount

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:80/api/tasks/${taskId}`,
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

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTask = {
      name: taskName,
      description: taskDescription,
      due_date: dueDate,
      assignee: assignee,
      assignee_id: 2,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:80/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task created:", response.data);

      // Update tasks list with new task
      fetchData();
      // Clear form fields after submission
      setTaskName("");
      setTaskDescription("");
      setDueDate("");
      setAssignee("");

      // Close modal
      // document.getElementById("my_modal_5").close();
      setShowToast(true); // Show toast notification
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
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

          {showToast && (
            <div className="toast">
              <div className="alert alert-info">
                <span>Task created successfully!</span>
              </div>
            </div>
          )}

          <ul className="list bg-base-100 rounded-box shadow-md">
            <div className="p-4 pb-2 text-xs w-full flex justify-between items-center py-8">
              <h3 className="text-lg font-bold px-5 opacity-50">Tasks</h3>

              <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  <h3 className="font-bold text-lg mb-3">Create New Task</h3>
                  {loading ? (
                    // Show spinner while loading
                    <div className="flex justify-center py-4">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  ) : (
                    <form onSubmit={handleCreateTask}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          placeholder="Enter task name"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <textarea
                          className="textarea textarea-bordered w-full"
                          placeholder="Enter task description"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <input
                          type="date"
                          className="input input-bordered w-full"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          required
                        />
                      </div>

                      {/* User Assignment Dropdown */}
                      <div className="mb-3">
                        {/* <h1>Hello, {users.length} users</h1> */}
                        <select
                          value={assignee} // Controlled value
                          className="select w-full"
                        >
                          <option disabled selected>
                            {loading ? "Loading users..." : "Assign user"}
                          </option>
                          {users.length > 0 ? (
                            users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))
                          ) : (
                            <option disabled>No users found</option>
                          )}
                        </select>
                      </div>

                      <div className="modal-action">
                        <button type="submit" className="btn btn-success">
                          Create Task
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() =>
                            document.getElementById("my_modal_5").close()
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </dialog>

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
                  assignee={task.assignee?.name} // Assigned user (e.g., Percy Michael)
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
