import React from 'react';
import Route from './components/Route';
import { navigate } from './components/Router';

const Hi = () => (
  <h1>안녕하세요</h1>
);

const Umc = () => (
  <h1>쑤기</h1>
);

const NotFound = () => (
  <h1>페이지 없음</h1>
);

const App: React.FC = () => {
  const currentPath = window.location.pathname;

  return (
    <div style={{ padding: '20px' }}>
      <nav>
        <button onClick={() => navigate('/')}>umc</button>
        <button onClick={() => navigate('/umc')}>쑤기</button>
      </nav>

      <Route path="/" element={<Hi />} />
      <Route path="/umc" element={<Umc />} />
      {currentPath !== '/' && currentPath !== '/umc' && <NotFound />}
    </div>
  );
};

export default App;