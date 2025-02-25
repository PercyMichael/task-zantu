import axios from "axios";
import React from "react";

const Task = ({
  id,
  name,
  description,
  assignee,
  dueDate,
  deleteTask, // Function to delete task
  status,
  taskNumber, // Adding task number
}) => {
  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleString(); // This will display in the local timezone with a readable format
  };

  return (
    <li className="list-row">
      <div class="text-4xl font-thin opacity-30 tabular-nums">{taskNumber}</div>

      <div>
        <div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-black text-lg">{name}</h2>
            <span className="status status-lg status-success"></span>
          </div>
          <div className="text-xs font-semibold py-2">
            <span className="opacity-60">Assigned to</span>{" "}
            <span className="text-black">{assignee}</span>
            <p class="list-col-wrap text-xs font-light pt-2">{description}</p>
            <p class="text-xs font-light text-gray-600 pt-2">
              Expected By{" "}
              <span class="font-semibold">{formatDueDate(dueDate)}</span>
            </p>{" "}
          </div>
        </div>
      </div>
      <button className="btn btn-square btn-link text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      <button
        // onClick={() => document.getElementById("my_modal_5").showModal()}
        onClick={() => deleteTask(id)} // Delete task
        className="btn btn-square btn-link text-red-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </li>
  );
};

export default Task;
