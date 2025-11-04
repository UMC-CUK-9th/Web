import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from './layouts/HomeLayout'; 
import MyPage from './pages/MyPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import RootLayout from './layouts/RootLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

const routerConfig: RouteObject[] = [
{
element: <RootLayout />,
 errorElement: <NotFoundPage />,
 children: [
 {
 element: <HomeLayout />,
 children: [
{ index: true, element: <HomePage /> },
{ path: "login", element: <LoginPage /> },
 { path: "signup", element: <SignUpPage /> },
 {path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/> }, 
 ],
},
 {
 element: <ProtectedLayout />,
 children: [{ path: "my", element: <MyPage /> }],
},
],
},
];

const router = createBrowserRouter(routerConfig);

function App() {
return <RouterProvider router={router} />;
}

export default App;