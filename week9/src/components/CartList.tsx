//src/components/Cartlist.tsx
import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();

  return (
    <ul className="w-full mt-4 space-y-2">
      {cartItems.map((item) => (
        <CartItem key={item.id} lp={item} />
      ))}
    </ul>
  );
};


export default CartList;