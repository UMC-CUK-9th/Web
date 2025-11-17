// src/App.tsx

import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";

// --- 페이지 임포트 ---
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import LpDetailPage from "./pages/LpDetailPage";
import GooglePage from "./pages/GoogleLoginRedirectPage";
import LpSearchPage from "./pages/LpSearchPage"; // [추가] 검색 페이지 임포트

// --- 레이아웃 임포트 ---
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

// --- 라이브러리 임포트 ---
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const publicRoutes: RouteObject = {
  path: "/",
  element: <HomeLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: "v1/auth/google/callback", element: <GooglePage /> },
    { path: "lp/:lpid", element: <LpDetailPage /> },
    { path: "search", element: <LpSearchPage /> }, // [추가] 검색 페이지 라우트
  ],
};

const protectedRoutes: RouteObject = {
  path: "/",
  element: <ProtectedLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "my",
      element: <MyPage />,
    },
  ],
};

const router = createBrowserRouter([publicRoutes, protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* 개발 모드일 때만 Devtools 렌더링 */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;