import React from 'react';
import { useCartStore } from '../hooks/useCartStore';

// 대체 아이콘
const FaShoppingCart = () => <span style={{fontSize: '24px'}} role="img" aria-label="shopping cart">🛒</span>;

const Navbar: React.FC = () => {
  // Zustand 훅을 사용하여 amount만 가져옵니다.
  const amount = useCartStore((store) => store.amount);

  return (
    <nav className="sticky top-0 z-10 shadow-lg bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold tracking-wider">
                JaeBeom
            </h1>
            <div className="flex items-center space-x-1 relative">
                <FaShoppingCart />
                <span 
                    className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-900 shadow-md transition-all duration-300"
                >
                    {amount}
                </span>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;