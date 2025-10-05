
import React from 'react';
import { Router } from './components/Router';
import Route from './components/Route';
import Link from './components/Link';
import APage from './pages/APage';
import BPage from './pages/BPage';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">A</Link> | <Link to="/B">B</Link>
      </nav>
      <main>
        <Router>
          {({ path }) => (
            <>
              <Route currentPath={path} path="/" component={<APage />} />
              <Route currentPath={path} path="/B" component={<BPage />} />
            </>
          )}
        </Router>
      </main>
    </div>
  );
}

export default App;