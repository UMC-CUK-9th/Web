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
