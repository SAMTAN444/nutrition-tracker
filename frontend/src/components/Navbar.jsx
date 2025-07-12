import { useState, useRef, useEffect } from "react";
import { Utensils, Settings, LogOut, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import icon from "../assets/wellifelogo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Navbar = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    MySwal.fire({
      icon: "success",
      title: "Logging out",
      text: "Redirecting to login...",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <img
          src={icon}
          alt="Wellife logo"
          className="w-20 h-20 object-contain"
        />
        <span className="text-2xl text-black tracking-wide">Wellife</span>
      </div>

      <div className="flex items-center gap-3">
        

        
        <button
          className="w-15 h-15 rounded-full bg-gray-800 flex items-center justify-center hover:opacity-80 hover:scale-110 transition"
          onClick={handleLogout}
        >
          <LogOut className="w-6 h-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
