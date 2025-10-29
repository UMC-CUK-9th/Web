import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import { Children } from 'react';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

//인증없이 접근 가능한 라우트
const publicRoutes:RouterObject[] = [
  {
    path: "/", 
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index:true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "v1/auth/google/callback",element:<GoogleLoginRedirectPage/>}
      
    ],
  },
];
//인증이 필요한 라우트
const protectedRoutes:RouterObject[] = [
  {
    path:"/",
    element:<ProtectedLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {
        path:"my",
        element:<MyPage/>
      },
    ],
  },
];

const router:Router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
function App() {

  return(
    <AuthProvider>
     <RouterProvider router={router}/>;
     </AuthProvider>
  )
}

export default App
