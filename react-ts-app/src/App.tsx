import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main style={{padding: '0 20px'}}>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
