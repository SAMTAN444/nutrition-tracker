import { useState } from "react";
import { Mail, Lock, Facebook, Github } from "lucide-react";
import monkBird from "../assets/monkBird.png";
import wellifelogo from "../assets/wellifelogo.png";
import monkBird2 from "../assets/monkBird2.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#fdf6f3] px-4 overflow-hidden">
      {/* Background mascot - transparent */}
      <img
        src={monkBird2}
        alt="background mascot"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-20 w-[90%] md:w-[60%] pointer-events-none select-none"
      />

      {/* Glasslike Outer Box */}
      <div className="relative z-10 w-full max-w-4xl bg-white/40 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-md flex flex-col  items-center justify-between gap-10">
        {/* Foreground content */}
        <div className="flex flex-col md:flex-row items-center justify-center bg-white/40 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-md gap-10">
          {/* Left - Login Form */}
          <div className="w-[300px] md:w-[350px] flex flex-col gap-4">
            <img src={wellifelogo} alt="logo" className="w-30 h-30" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>

            <input
              type="email"
              placeholder="sam@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="text-right text-sm text-orange-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-200">
              Sign in
            </button>

            <div className="text-sm text-center mt-3 text-gray-600">
              Don't have an account yet?
              <span className="text-orange-600 hover:underline cursor-pointer ml-2">
                Register for free
              </span>
            </div>
          </div>

          {/* Right - Mascot */}
          <img
            src={monkBird}
            alt="mascot"
            className="w-[180px] md:w-[220px] drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
