import { Link } from "react-router-dom";
import { usePlaylistStore } from "../stores/playlistStore";

const Navbar = () => {
  const amount = usePlaylistStore((state) => state.amount);

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        UMC Playlist
      </Link>

      <div className="relative">
        <span className="text-xl">🛒</span>
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {amount}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
