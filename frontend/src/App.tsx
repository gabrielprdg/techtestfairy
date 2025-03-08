import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './styles/global.scss';
import SignUp from './pages/Signup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App
