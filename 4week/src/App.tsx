import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'; // 'type RouteObject'로 수정
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
// import { Children } from 'react'; // (사용되지 않으므로 제거)
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// [1] (추가) 방금 만든 상세 페이지 임포트
import LpDetailPage from './pages/LpDetailPage';

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

//인증없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [ // 'RouterObject' -> 'RouteObject'
  {
    path: "/", 
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index:true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "v1/auth/google/callback",element:<GoogleLoginRedirectPage/>},
      
      // [2] (추가) LP 상세 페이지 라우트
      // 주소창에 /lp/1, /lp/2 등이 입력되면 LpDetailPage를 보여줍니다.
      {path: "lp/:lpId", element: <LpDetailPage />}
    ],
  },
];
//인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [ // 'RouterObject' -> 'RouteObject'
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

// 'Router' 타입을 제거하고 타입 추론에 맡깁니다.
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient: QueryClient = new QueryClient();

function App() {

  return(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
      {<ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App