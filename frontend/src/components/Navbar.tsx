import { Link } from "@tanstack/react-router";
import { FiPlus } from "react-icons/fi";

const Navbar = () => {
	return (
		<header>
			<nav className="sticky top-0 z-10 max-w-6xl mx-auto p-4 flex items-center justify-between shadow-md rounded-xl bg-gradient-to-r from-gray-700 to-gray-600">
				<Link to={"/"}>
					<h1 className="text-3xl font-bold font-mono text-orange-400">ThinkBoard</h1>
				</Link>
				<Link to={"/create-note"}>
					<button className="px-3 py-2 text-sm font-semibold rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition flex items-center gap-1 shadow">
						<FiPlus size={18} /> New Note
					</button>
				</Link>
			</nav>

		</header>
	);
};

export default Navbar;
