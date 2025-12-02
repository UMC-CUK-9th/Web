import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  return (
    <header className="w-full bg-black text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Logo
        </h1>

        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-2xl" />
          <span className="text-xl font-medium">{amount}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
