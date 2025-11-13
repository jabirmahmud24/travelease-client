import React, { use, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaImage,
  FaEnvelope,
  FaLock,
  FaCar,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import gsap from "gsap";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { createUser, setUser, updateUserProfile } = use(AuthContext);
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

            axios
              .post("https://travelease-server.vercel.app/users", newUser, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then(() => {
                navigate("/");
                window.location.reload();
              })
              .catch((err) => {
                console.error("Database save error:", err);

                navigate("/");
                window.location.reload();
              });
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Profile update failed");
            setUser(user);

            navigate("/");
            window.location.reload();
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
              Start Your Journey Today
            </h2>

            <p
              className="text-lg text-slate-600 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Join TravelEase to access premium vehicles, exclusive deals, and
              seamless booking experiences for your next adventure.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] w-1 h-12 rounded-full"></div>
                <div>
                  <p
                    className="font-semibold text-[#002f6c]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Quick Registration
                  </p>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Get started in minutes
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
                    Secure & Safe
                  </p>
                  <p
                    className="text-sm text-slate-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Your data is protected
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Register Form */}
          <div className="card bg-white shadow-2xl border border-slate-100 rounded-3xl overflow-hidden">
            <div className="card-body p-8 sm:p-10">
              <div ref={titleRef} className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#002f6c] mb-2">
                  Create Account
                </h2>
                <p
                  className="text-slate-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Register to start your journey
                </p>
              </div>

              <form ref={formRef} onSubmit={handleRegister}>
                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-[#002f6c] font-semibold flex items-center gap-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <FaUser className="text-[#0ea5e9]" />
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="input input-bordered bg-slate-50 border-slate-300 focus:border-[#0ea5e9] focus:bg-white transition-all rounded-xl text-[#002f6c] ml-2 sm:ml-4 w-full"
                      placeholder="Enter your name"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  {/* Photo URL Input */}
                  <div className="form-control">
                    <label className="label">
                      <span
                        className="label-text text-[#002f6c] font-semibold flex items-center gap-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <FaImage className="text-[#14b8a6]" />
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      className="input input-bordered bg-slate-50 border-slate-300 focus:border-[#0ea5e9] focus:bg-white transition-all rounded-xl text-[#002f6c] ml-2 sm:ml-4 w-full"
                      placeholder="Enter photo URL (optional)"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

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
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        className="input input-bordered bg-slate-50 border-slate-300 focus:border-[#0ea5e9] focus:bg-white transition-all rounded-xl text-[#002f6c] ml-2 sm:ml-4 w-full pr-12"
                        placeholder="Enter your password"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                      <button
                        onClick={handleTogglePasswordShow}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#0ea5e9] transition-colors"
                      >
                        {showPassword ? (
                          <FaEyeSlash size="20px" />
                        ) : (
                          <FaEye size="20px" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Error */}
                  {passwordError && (
                    <div className="alert alert-error bg-red-50 border-red-200 rounded-xl">
                      <span
                        className="text-red-600 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {passwordError}
                      </span>
                    </div>
                  )}

                  {/* General Error */}
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

                  {/* Success Message */}
                  {success && (
                    <div className="alert alert-success bg-green-50 border-green-200 rounded-xl">
                      <span
                        className="text-green-600 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Account created successfully!
                      </span>
                    </div>
                  )}

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="btn btn-lg w-full bg-linear-to-r from-[#0ea5e9] to-[#14b8a6] hover:from-[#0284c7] hover:to-[#0d9488] border-none text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Create Account
                    <FaArrowRight className="ml-2" />
                  </button>

                  {/* Login Link */}
                  <p
                    className="text-center text-slate-600 pt-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[#0ea5e9] hover:text-[#0284c7] font-semibold transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
