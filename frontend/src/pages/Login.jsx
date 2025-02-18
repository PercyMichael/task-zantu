import React from "react";
import PasswordIcon from "../icons/PasswordIcon";
import MailIcon from "../icons/MailIcon";
import { Link } from "react-router-dom";

const Login = () => {
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
            <label class="input input-xl w-full validator">
              <MailIcon />
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>

            {/* Password */}
            <label className="input input-xl w-full validator">
              <PasswordIcon />
              <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
              <button className="btn btn-success btn-block btn-xl">
                Login Now
              </button>
              <p className="text-center mt-4">
                <Link to="/register">
                  Dont have an account?{" "}
                  <sapn className="text-green-700">Register</sapn>
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
