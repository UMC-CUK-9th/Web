import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/movies">인기영화</Link>
    </nav>
  );
};

export default Navbar;