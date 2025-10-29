import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from './layouts/HomeLayout'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />, // 공통 레이아웃 적용
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // 기본 경로일 때 HomePage 렌더링
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;