import { Container } from '@mui/material'
import './App.css'
import TaskList from './components/TaskList'
import Registration from './components/Registeration';
import UserLogin from './components/UserLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/HomePage';

function App() {
  

  return (


  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route path="/login" element={<UserLogin/>}></Route>
      <Route path="/tasks" element={<TaskList/>}></Route>
      
    </Routes>
  </Router>

  

 
  );

}





export default App
