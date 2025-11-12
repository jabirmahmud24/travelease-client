import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaCar,
  FaArrowRight,
} from "react-icons/fa";
import gsap from "gsap";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      tl.fromTo(
        formRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

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
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white relative overflow-hidden flex items-center justify-center py-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30 -z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Branding */}
          <div className="hidden lg:block space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-[#0ea5e9] to-[#14b8a6] p-4 rounded-2xl">
                <FaCar className="text-4xl text-white" />
              </div>
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0ea5e9] to-[#14b8a6]">
                  Travel
                </span>
                <span className="text-[#002f6c]">Ease</span>
              </h1>
            </div>

            <h2
              className="text-3xl font-bold text-[#002f6c]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Welcome Back to Your Journey
            </h2>

            <p
              className="text-lg text-slate-600 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Sign in to access your vehicle bookings, manage your trips, and
              explore new adventures with TravelEase.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] w-1 h-12 rounded-full"></div>
                <div>
                  <p
                    className="font-semibold text-[#002f6c]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    500+ Vehicles
                  </p>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Premium fleet available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-[#14b8a6] to-[#0ea5e9] w-1 h-12 rounded-full"></div>
                <div>
                  <p
                    className="font-semibold text-[#002f6c]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    24/7 Support
                  </p>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Always here to help
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="card bg-white shadow-2xl border border-slate-100 rounded-3xl overflow-hidden">
            <div className="card-body p-8 sm:p-10">
              <div ref={titleRef} className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#002f6c] mb-2">
                  Welcome Back
                </h2>
                <p
                  className="text-slate-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Sign in to continue your journey
                </p>
              </div>

              <div ref={formRef}>
                <div className="space-y-5">
                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-[#002f6c] font-semibold flex items-center gap-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <FaEnvelope className="text-[#0ea5e9]" />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="input input-bordered bg-slate-50 border-slate-300 focus:border-[#0ea5e9] focus:bg-white transition-all rounded-xl text-[#002f6c] ml-2 sm:ml-4 w-full"
                      placeholder="Enter your email"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-[#002f6c] font-semibold flex items-center gap-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <FaLock className="text-[#14b8a6]" />
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      className="input input-bordered bg-slate-50 border-slate-300 focus:border-[#0ea5e9] focus:bg-white transition-all rounded-xl text-[#002f6c] ml-2 sm:ml-4 w-full"
                      placeholder="Enter your password"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  {/* Forget Password Link */}
                  <div className="text-right">
                    <Link
                      to="/forgetPassword"
                      className="text-sm text-[#0ea5e9] hover:text-[#0284c7] font-medium transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-error bg-red-50 border-red-200 rounded-xl">
                      <span
                        className="text-red-600 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="btn btn-lg w-full bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Sign In
                    <FaArrowRight className="ml-2" />
                  </button>

                  {/* Divider */}
                  <div
                    className="divider text-slate-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    OR
                  </div>

                  {/* Google Sign In */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-lg btn-outline border-2 border-slate-300 hover:border-[#0ea5e9] hover:bg-slate-50 text-[#002f6c] w-full rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <FaGoogle className="text-xl" />
                    Continue with Google
                  </button>

                  {/* Register Link */}
                  <p
                    className="text-center text-slate-600 pt-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-[#0ea5e9] hover:text-[#0284c7] font-semibold transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
