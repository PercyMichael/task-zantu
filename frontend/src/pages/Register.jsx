import React, { useState } from "react";
import PasswordIcon from "../icons/PasswordIcon";
import MailIcon from "../icons/MailIcon";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../icons/UserIcon";
import axios from "axios"; // Ensure axios is imported

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password_confirmation") {
      setPasswordConfirmation(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    // Prepare the request data
    const data = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    console.log("====================================");
    console.log(data);
    console.log("====================================");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response has the user data and token
      const { token } = response.data;

      // If successful, store the token (for example in localStorage)
      localStorage.setItem("token", token);

      setSuccess("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.log("====================================");
      console.log(err.response.data.errors);

      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <main className="bg-gradient-to-b from-slate-200 to-cyan-50 h-screen flex items-center justify-center">
        <div className="card w-xl bg-base-100 shadow-sm">
          <div className="card-body flex flex-col space-y-3.5">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Create an Account</h2>
            </div>
            <p className="pb-5">
              Sign up to start managing your tasks effortlessly. Track your
              progress, set deadlines, and boost your productivity.
            </p>

            {/* Display error or success message */}
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            {/* Name */}
            <label className="input input-xl w-full">
              <UserIcon />
              <input
                type="text"
                onChange={handleInputChange}
                name="name"
                value={name} // Binding value to state
                pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
                placeholder="Enter your name"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Name must contain only letters
            </div>

            {/* Email */}
            <label className="input input-xl w-full">
              <MailIcon />
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={email} // Binding value to state
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter a valid email address
            </div>

            {/* Password */}
            <label className="input input-xl w-full">
              <PasswordIcon />
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={password} // Binding value to state
                required
                placeholder="Password"
                minLength="8"
                pattern="^(?=.*\d)[A-Za-z\d]{6,}$"
                title="Must be more than 8 characters, including a number, lowercase letter, and uppercase letter"
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

            {/* Password Confirmation */}
            <label className="input input-xl w-full">
              <PasswordIcon />
              <input
                name="password_confirmation"
                type="password"
                onChange={handleInputChange}
                value={passwordConfirmation} // Binding value to state
                required
                placeholder="Confirm Password"
                minLength="8"
                pattern="^(?=.*\d)[A-Za-z\d]{6,}$"
                title="Must be more than 8 characters, including a number, lowercase letter, and uppercase letter"
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
                className={`btn btn-success btn-block btn-xl ${
                  loading ? "loading" : ""
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="text-center mt-4">
                <Link to="/login">
                  Already registered?{" "}
                  <span className="text-green-700">Login Now</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
