import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log("User signed in:", result.user);
        setError("");
        form.reset();
        navigate("/"); // redirect to homepage or dashboard
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        setError("Invalid email or password");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google sign-in:", result.user);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form
          onSubmit={handleLogin}
          className="shadow-md rounded-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </div>
          <p className="text-sm mb-4">
            <Link to="/forgetPassword" className="text-blue-500">
              Forget Password?
            </Link>
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full mt-3"
          >
            Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
