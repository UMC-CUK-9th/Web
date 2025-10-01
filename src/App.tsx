<<<<<<< HEAD
import { useState, useEffect, Children, cloneElement, ReactElement } from 'react';
import './App.css';

const JaebumPage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">재범 페이지입니다 😎</h1>
  </div>
);

const KkulbeomPage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">꿀범 페이지입니다 🍯</h1>
  </div>
);

const NotFoundPage = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🚨 404 Not Found 🚨</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  );


// 렌더링될 컴포넌트와 경로를 정의
interface RouteProps {
  path: string;
  component: ReactElement;
}
const Route = ({ path, component }: RouteProps) => {
  return null;
};


// Router: URL 경로를 감지
const Router = ({ children }: { children: ReactElement[] }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('pushstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('pushstate', onLocationChange);
    };
  }, []);

  const routeComponent =
    Children.map(children, (child) => {
      return child.props.path === currentPath ? child.props.component : null;
    })?.filter(Boolean)[0] || <NotFoundPage />; // 일치하는 경로가 없으면 NotFoundPage를 보여줌

  return routeComponent;
};

// Link: 새로고침 없이 URL을 변경하는 컴포넌트
const Link = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('pushstate'));
  };

  return (
    <a href={to} onClick={handleClick} className="hover:underline">
      {children}
    </a>
  );
};


function App() {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 font-bold text-center flex justify-center gap-6 text-lg">
       
        <Link to="/jaebum">재범페이지  </Link>
        <Link to="/kkulbeom">꿀범페이지</Link>
      </nav>
      <main className='text-center mt-10'>
        <Router>
            
            <Route path="/jaebum" component={<JaebumPage />} />
            <Route path="/kkulbeom" component={<KkulbeomPage />} />
        </Router>
      </main>
    </div>
  );
}

export default App;
=======
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage';
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movie/:category',
        element: <MoviePage />
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />
      }
   ],
  },
]);

function App() : JSX.Element {
  return <RouterProvider router={router} />;
}

export default App

>>>>>>> 7e0a8be (3주차 과제 모두 진행)
