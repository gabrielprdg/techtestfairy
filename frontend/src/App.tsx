import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './pages/Dashboard';
import './styles/global.scss';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
