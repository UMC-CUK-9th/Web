import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedLayout from "./layout/ProtectedLayout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import NowPlaying from "./pages/NowPlaying";
import TopRated from "./pages/TopRated";
import Upcoming from "./pages/Upcoming";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Logout from "./pages/Authentication/Logout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/top_rated" element={<TopRated />} />
          <Route path="/now_playing" element={<NowPlaying />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/v1/auth/google/callback"
            element={<GoogleLoginRedirectPage />}
          />

          <Route element={<ProtectedLayout />}>
            <Route path="/mypage" element={<Mypage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
