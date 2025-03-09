// App.tsx
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './styles/global.css';
import SignUp from './pages/Signup';
import { PrivateRoute } from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import UpdateTask from './pages/UpdateTask';
import CreateTask from './pages/CreateTask';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateTask/:id"
          element={
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/createTask"
          element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
