import { Utensils, Settings, User } from "lucide-react";
import icon from '../assets/wellifelogo.png';

const Navbar = () => {

    return (
        <nav className="w-full bg-gray-50 shadow-sm px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
            <div className="flex items-center gap-3">
                <img 
                src={icon}
                alt="Wellife logo"
                className="w-20 h-20 object-contain"
                />
                <span className="text-2xl font-poppins text-gray-800 tracking-wide">Wellife</span>
            </div>

            <div className="flex items-center gap-3">
                <button className="w-15 h-15 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition">
                    <Utensils className="w-6 h-6" />
                </button>
                <button className="w-15 h-15 rounded-full bg-yellow-100 flex items-center justify-center hover:bg-yellow-200 transition">
                    <Settings className="w-6 h-6"/>
                </button>
                <button className="w-15 h-15 rounded-full bg-gray-800 flex items-center justify-center hover:opacity-80 transition">
                    <User className="w-6 h-6 text-white" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar