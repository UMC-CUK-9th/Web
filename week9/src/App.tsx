import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import TotalPrice from "./components/TotalPrice";

function App() {
  return (
    <div className="bg-[#F2F5F9] min-h-screen">
      <Navbar />
      <CartList />
      <TotalPrice />
    </div>
  );
}

export default App;