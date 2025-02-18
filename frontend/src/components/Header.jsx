import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { setUser } = useContext(AppContext);

  async function logout() {
    try {
      // Optionally, send a request to invalidate the token on the server
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or use sessionStorage
          },
        }
      );

      // Remove the token from localStorage (or sessionStorage)
      localStorage.removeItem("token"); // or sessionStorage.removeItem("token");

      // Optionally, reset the user state (if you're using React or similar)
      setUser(null); // Assuming `setUser` clears the user state

      console.log("Logged out successfully!");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error
      );
    }
  }
  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TaskZantu</a>
        </div>
        <div className="flex-none">
          <Link to="/login">
            <button className="btn" onClick={logout}>
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </button>{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
