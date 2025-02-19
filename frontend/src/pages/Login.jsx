import axios from "axios";
import React, { useContext, useState } from "react";
import PasswordIcon from "../icons/PasswordIcon";
import MailIcon from "../icons/MailIcon";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  // Set up state for email, password, errors, and the authentication token
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useContext(AppContext);

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");
    setIsLoading(true);

    try {
      // Send login request with Axios and headers
      const response = await axios.post(
        "http://127.0.0.1:80/api/login", // Replace with your actual login API endpoint
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response has the user data and token
      const { token } = response.data;

      // If successful, store the token (for example in localStorage)
      localStorage.setItem("token", token);
      setToken(token);

      // Optionally, you can redirect the user to a protected route
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed!");
      } else {
        setError("Network error, please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <main className="bg-gradient-to-b from-slate-200 to-cyan-50 h-screen flex items-center justify-center">
        {/* card */}

        <div className="card w-xl bg-base-100 shadow-sm">
          <div className="card-body flex flex-col space-y-3.5">
            <span className="badge badge-xs badge-warning">Welcome Back</span>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Sign In</h2>
            </div>
            <p>Log in to access your tasks,Manage Your Tasks Efficiently</p>

            {/* Email */}
            <label class="input input-lg w-full validator">
              <MailIcon />
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
                onChange={handleInputChange}
              />
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>

            {/* Password */}
            <label className="input input-lg w-full validator">
              <PasswordIcon />
              <input
                type="password"
                name="password"
                required
                onChange={handleInputChange}
                placeholder="Password"
                minlength="8"
                pattern="^(?=.*\d)[A-Za-z\d]{6,}$"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="btn btn-success btn-block btn-lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login Now"}
              </button>
              <p className="text-center mt-4">
                <Link to="/register">
                  Dont have an account?{" "}
                  <span className="text-green-700">Register</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* card */}
      </main>
    </div>
  );
};

export default Login;
