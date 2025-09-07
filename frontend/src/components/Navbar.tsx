import { Link } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <header>
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between text-white shadow-lg rounded-xl">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold font-mono text-[#F5A524]">ThinkBoard</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link to={"/"} className="flex gap-2 items-center">
            <button className="font-semibold px-2 py-2 text-sm rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition flex items-center gap-1">
              <FiPlus size={20} />  New Note
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
