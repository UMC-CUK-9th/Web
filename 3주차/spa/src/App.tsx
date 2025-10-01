import React from 'react';
import Link from './components/Link';
import Route from './components/Route';
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>SPA</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
      </header>
      <hr />
      <main>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </main>
    </div>
  );
}

export default App;