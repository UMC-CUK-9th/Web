import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/root-layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import NotFoundPage from "./pages/notFound";
import ProtectedLayout from "./layouts/protected-layout";
import MyPage from "./pages/my";
import RedirectPage from "./pages/redirect";

const PublicRouter = {
  path: "/",
  element: <RootLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signUp",
      element: <SignUpPage />,
    },
    {
      path: "v1/auth/google/callback",
      element: <RedirectPage />,
    },
  ],
};

const ProtectedRouter = {
  path: "/",
  element: (
    <ProtectedLayout>
      <RootLayout />
    </ProtectedLayout>
  ),
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "my",
      element: <MyPage />,
    },
  ],
};

const router = createBrowserRouter([PublicRouter, ProtectedRouter]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
