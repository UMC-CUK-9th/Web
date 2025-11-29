import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Navbar = () => {
  const amount = useSelector((state: RootState) => state.cart.amount);

  return (
    <nav className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Ohtani Ahn
      </Link>

      <Link to="/cart" className="relative">
        <span className="text-xl">🛒</span>
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {amount}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
