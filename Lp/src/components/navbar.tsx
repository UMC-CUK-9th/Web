import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postLogout } from "../apis/auth";
import type { Profile } from "../types/users";
import { FaSearch } from "react-icons/fa";
import Menu from "../assets/icons/hamburger-button.svg";
import { getMe } from "../apis/users";

interface props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setIsOpen }: props) => {
  const [myInfo, setMyInfo] = useState<Profile>();
  const { getItem } = useLocalStorage("accessToken");
  const token = getItem();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const getData = async () => {
        const { data } = await getMe();
        setMyInfo(data);
        console.log(data);
      };
      getData();
    }
  }, [token]);

  const handleLogout = async () => {
    await postLogout();
    console.log("로그아웃");
    navigate("/");
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setIsOpen]);

  return (
    <nav className="flex justify-between p-5 bg-[#252525ff] text-white text-center">
      <div className="flex items-center gap-3">
        <img
          src={Menu}
          alt="menu"
          className="w-6 h-6 invert cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <NavLink to="/" className="text-pink-500 text-2xl font-bold">
          돌려돌려Lp판
        </NavLink>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <button className="cursor-pointer">
          <FaSearch />
        </button>
        {myInfo?.name ? (
          <>
            <div>{myInfo.name}님 환영합니다.</div>
            <button
              className="bg-black rounded-lg w-20 h-10"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-black rounded-lg w-20 h-10 flex items-center justify-center"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signUp"
              className="bg-pink-500 rounded-lg w-20 h-10 flex items-center justify-center"
            >
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
