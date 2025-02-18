import React from "react";
import PasswordIcon from "../icons/PasswordIcon";
import MailIcon from "../icons/MailIcon";
import { Link } from "react-router-dom";
import UserIcon from "../icons/UserIcon";

const Register = () => {
  return (
    <div className="h-screen">
      <main className="bg-gradient-to-b from-slate-200 to-cyan-50 h-screen flex items-center justify-center">
        {/* card */}

        <div className="card w-xl bg-base-100 shadow-sm">
          <div className="card-body flex flex-col space-y-3.5">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Create an Account</h2>
            </div>
            <p className="pb-5">
              Sign up to start managing your tasks effortlessly. Track your
              progress, set deadlines, and boost your productivity.
            </p>

            {/* Name */}
            <label class="input input-xl w-full validator">
              <UserIcon />
              <input
                type="text"
                pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
                placeholder="Enter your name"
                required
              />
            </label>
            <div class="validator-hint hidden">
              Name must contain only letters
            </div>

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

            {/* Password Confirmation */}
            <label className="input input-xl w-full validator">
              <PasswordIcon />
              <input
                name="password_confirmation"
                type="password"
                required
                placeholder="Confirm Password"
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
                Register
              </button>
              <p className="text-center mt-4">
                <Link to="/login">
                  Already regitered?{" "}
                  <span className="text-green-700">Login Now</span>
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

export default Register;
