import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
