import { Container } from '@mui/material'
import './App.css'
import Registration from './components/Registeration';
import UserLogin from './components/UserLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/HomePage';
import AddTaskForm from './components/AddTaskForm';
import EnhancedTable from './components/TaskList';

function App() {
  
  return (


  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route path="/login" element={<UserLogin/>}></Route>
      <Route path="/tasks" element={<EnhancedTable/>}></Route>
      <Route path='/newtask' element={<AddTaskForm/>}></Route>
    </Routes>
  </Router>

  

 
  );

}





export default App
