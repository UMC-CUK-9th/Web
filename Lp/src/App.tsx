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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/lpDetail";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

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
    {
      path: "lp/:id",
      element: <LpDetailPage />,
    },
  ],
};

const router = createBrowserRouter([PublicRouter, ProtectedRouter]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
