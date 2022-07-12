import './App.css';
import Signup from './component/signup/Signup';
import { useNavigate, Route, Routes } from 'react-router-dom'
import Login from './component/login/Login';
import Home from './component/home/Home';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home/>}/>
    </Routes>


  );
}
export default App;
