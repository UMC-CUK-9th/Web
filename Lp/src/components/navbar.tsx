import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between p-5 bg-[#252525ff] text-white text-center'>
        <NavLink to="/" className='text-pink-500 text-2xl font-bold'>돌려돌려Lp판</NavLink>
        <div className='flex gap-2'>
            <NavLink to="/login" className='bg-black rounded-lg w-20 h-10 flex items-center justify-center'>로그인</NavLink>
            <NavLink to="/signUp" className='bg-pink-500 rounded-lg w-20 h-10 flex items-center justify-center'>회원가입</NavLink>
        </div>
    </nav>
  );
};

export default Navbar;