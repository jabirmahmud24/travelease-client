import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { createUser, setUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const length6Pattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

    if (!length6Pattern.test(password)) {
      setPasswordError("Password must be 6 characters or longer");
      return;
    } else if (!casePattern.test(password)) {
      setPasswordError(
        "Password must have at least one uppercase and one lowercase"
      );
      return;
    }

    // Reset errors
    setError("");
    setPasswordError("");
    setSuccess(false);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        toast.success("Registration completed!");

        // Update profile with name and photo
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // Update local user state
            setUser({ ...user, displayName: name, photoURL: photo });

            // Save user to database
            const newUser = {
              name: name,
              email: email,
              photoURL: photo,
              createdAt: new Date().toISOString(),
            };

            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("User saved to database:", data);
                navigate("/");
              })
              .catch((err) => {
                console.error("Database save error:", err);
                navigate("/");
              });
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Profile update failed");
            setUser(user);
            navigate("/");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <h2 className="font-semibold text-2xl text-center text-white mt-5">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              placeholder="Name"
              required
            />

            {/* Photo URL */}
            <label className="label text-slate-300">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              placeholder="Photo URL"
            />

            {/* Email */}
            <label className="label text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              placeholder="Email"
              required
            />

            {/* Password */}
            <label className="label text-slate-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePasswordShow}
                className="btn btn-xs absolute top-1.5 right-4"
              >
                {showPassword ? (
                  <FaEyeSlash size="20px" />
                ) : (
                  <FaEye size="20px" />
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-400 text-center font-bold">
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-neutral mt-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-transform transform hover:scale-105 border-none"
            >
              Register
            </button>

            <p className="text-center font-semibold pt-5 text-slate-300">
              Already have an account? Please{" "}
              <Link to="/login" className="text-secondary hover:text-blue-600">
                Login
              </Link>
            </p>
          </fieldset>

          {success && (
            <p className="text-green-600 text-center">
              Account created successfully
            </p>
          )}
          {error && (
            <p className="text-red-400 text-center font-bold">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
