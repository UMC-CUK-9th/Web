import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center m-4">
      {/* 왼-페이지 */}
      <ul className="flex gap-6">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-gray-400"
            }
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/popular"
            className={({ isActive }) =>
              isActive ? "text-green-500d" : "text-gray-400"
            }
          >
            인기 영화
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/now_playing"
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-gray-400"
            }
          >
            상영 중
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/top_rated"
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-gray-400"
            }
          >
            평점 높은
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-gray-400"
            }
          >
            개봉 예정
          </NavLink>
        </li>
      </ul>

      {/* 오-로긴/회언가입*/}
      <div className="flex gap-4">
        <NavLink
          to="/login"
          className="px-4 py-2 text-sm text-gray-700 hover:text-green-500 transition"
        >
          로그인
        </NavLink>
        <NavLink
          to="/signup"
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
        >
          회원가입
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
