import { NavLink  } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-6 m-4">
        <li>
          <NavLink to="/" end
            className={({ isActive }) => (isActive ? "text-green-500" : "text-gray-400")}
          >홈</NavLink>
        </li>
        <li>
          <NavLink to="/popular"
            className={({ isActive }) => (isActive ? "text-green-500" : "text-gray-400")}
          >인기 영화</NavLink>
        </li>
        <li>
          <NavLink to="/now_playing"
            className={({ isActive }) => (isActive ? "text-green-500" : "text-gray-400")}
          >상영 중</NavLink>
        </li>
        <li>
          <NavLink to="/top_rated"
            className={({ isActive }) => (isActive ? "text-green-500" : "text-gray-400")}
          >평점 높은</NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" 
            className={({ isActive }) => (isActive ? "text-green-500" : "text-gray-400")}
          >
            개봉 예정
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
