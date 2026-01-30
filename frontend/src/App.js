import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login.js';
import SignUp from './pages/Signup.js';
import Home from './pages/Home.js';
import Notes from './pages/Notes.js';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to='/login' />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} /> 
        <Route path='/notes' element={<PrivateRoute element={<Notes />} />} />
      </Routes>  
    </div>
  );
}

export default App;
