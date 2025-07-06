import { useState } from "react";
import monkBird from "../assets/monkBird.png";
import monkBird2 from "../assets/monkBird2.png";
import wellifelogo from "../assets/wellifelogo.png";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPoassword] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [username, setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      })
      return;
    }
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

    if (!passwordValid) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters, including an uppercase letter and a special character',
      })
      return;
    }

    try {
      const res = await axios.post("http://localhost:5175/api/auth/register", {
        username,
        password,
      });
      MySwal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting to Dashboard...',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard");
      })
      setIsSignUp(false);
      setUsername("")
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops",
        text: err.response?.data?.message || "Registration failed."
      })
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5175/api/auth/login", {
        username,
        password,
      });


      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      MySwal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'Redirecting to dashboard...',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard");
      })

    } catch(err) {
      MySwal.fire({
        icon: "erorr",
        title: "Oops",
        text: err.response?.data?.message || "Login failed."
      })
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#fdf6f3] overflow-hidden px-4 transition-all duration-700">
      {/* Background mascot - transparent */}
      <img
        src={monkBird2}
        alt="background mascot"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-20 w-[90%] md:w-[60%] pointer-events-none select-none"
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-5xl h-[600px] bg-white/30 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-1/2 h-full p-10 transition-transform duration-700 ${
            isSignUp
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          {/* Login Form */}
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <img src={wellifelogo} alt="logo" className="w-24 h-24 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange= {(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
            />

            <button 
              onClick={handleLogin}
              className="bg-purple-400 hover:bg-purple-600 text-white font-semibold py-2 rounded-md">
              Sign in
            </button>

            <button 
              type="button"
              onClick={() => setShowPoassword(!showPassword)}
              className="text-sm text-purple-500 underline self-end"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
        </div>

        {/* Register Form */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full p-10 bg-gradient-to-br from-[#fff7f3] via-[#fff3ea] to-[#fdf6f3] backdrop-blur-md rounded-2xl transition-transform duration-700 ${
            isSignUp
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <img src={wellifelogo} alt="logo" className="w-24 h-24 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Register</h1>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none  border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
            />
        
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button 
              onClick={handleRegister}
              className="bg-purple-400 hover:bg-purple-600 text-white font-semibold py-2 rounded-md">
              Register
            </button>

            <button 
              type="button"
              onClick={() => setShowPoassword(!showPassword)}
              className="text-sm text-purple-500 underline self-end"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-br from-purple-300 via purple-400 to-purple-400 text-white p-10 transition-transform duration-700 ease-in-out flex flex-col items-center justify-center ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="w-32 h-32 md:w-36 md:h-36 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg mb-4 hover:scale-105 transition-transform duration-300">
            <img
              src={monkBird}
              alt="mascot"
              className="w-28 md:w-36 drop-shadow-xl mb-4"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">
            {isSignUp ? "Welcome Back!" : "New Here?"}
          </h2>
          <p className="text-mb mb-6 font-semibold text-center text-white">
            {isSignUp
              ? "Already have an account? Sign in to continue"
              : "Create your account and start your wellness journey"}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-600 transition"
          >
            {isSignUp ? "Sign In" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
