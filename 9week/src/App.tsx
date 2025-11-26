import React from 'react';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import Modal from './components/Modal';
import { useCartStore } from './hooks/useCartStore'; 

// MainAppContent 컴포넌트는 Context 내부에서 훅을 사용하여 상태에 접근합니다.
const MainAppContent: React.FC = () => {
    // useCartStore 훅을 사용하여 모달 상태를 직접 가져옵니다.
    const isOpen = useCartStore((store) => store.isOpen);
    
    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            <Navbar />
            <CarList />
            
            {/* isOpen이 true일 때만 Modal 컴포넌트를 렌더링합니다. */}
            {isOpen && <Modal />}
        </div>
    );
}

// App Component: Zustand는 Provider가 필요 없으므로 컴포넌트들을 직접 렌더링합니다.
export default function App() {
  return (
    <MainAppContent />
  );
}