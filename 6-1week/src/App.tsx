import './App.css';
// 우리가 만든 컴포넌트를 임포트합니다.
import { WelcomeData } from './components/UserDataDisplay';
// 1. react-query에서 QueryClient와 QueryClientProvider를 가져옵니다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. QueryClient의 새 인스턴스를 생성합니다.
const queryClient = new QueryClient();

export function App(): Element {
  return (
    // 3. 앱 전체를 QueryClientProvider로 감싸고 client를 전달합니다.
    <QueryClientProvider client={queryClient}>
      <WelcomeData />
    </QueryClientProvider>
  );
}

export default App;
