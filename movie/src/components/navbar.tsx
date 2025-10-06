import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex gap-3 p-3'>
      <NavLink to="/" className={({isActive}) => isActive ? "text-[#b2dab1]":"text-gray-400"}>홈</NavLink>
      <NavLink to="/popular" className={({isActive}) => isActive ? "text-[#b2dab1]":"text-gray-400"}>인기 영화</NavLink>
      <NavLink to="/now_playing" className={({isActive}) => isActive ? "text-[#b2dab1]":"text-gray-400"}>상영 중</NavLink>
      <NavLink to="/top_rated" className={({isActive}) => isActive ? "text-[#b2dab1]":"text-gray-400"}>평점 높은</NavLink>
      <NavLink to="/upcoming" className={({isActive}) => isActive ? "text-[#b2dab1]":"text-gray-400"}>개봉 예정</NavLink>
    </nav>
  );
};

export default Navbar;