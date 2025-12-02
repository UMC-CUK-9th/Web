import './App.css';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import Modal from './components/Modal';
import { useCartStore } from './store/useCartStore';
import { useEffect } from 'react';

function App() {

  const { calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <div className='relative min-h-screen'>
      <Modal />
      <Navbar />
      <CartList />
      <PriceBox />
    </div>
  );
}

export default App;