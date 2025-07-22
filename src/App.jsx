import { Container } from '@mui/material'
import './App.css'
import Registration from './components/Registeration';
import UserLogin from './components/UserLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/HomePage';
import AddTaskForm from './components/AddTaskForm';
import EnhancedTable from './components/TaskList';
import Logout from './components/Logout';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProfileDashboard from './components/ProfileDashboard';
import LoginForm from './components/LoginForm';

function App() {

  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<LoginForm  />}></Route>
        <Route path="/tasks" element={<EnhancedTable/>}></Route>
        <Route path='/newtask' element={<AddTaskForm/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/profile' element={<PrivateRoute><ProfileDashboard/></PrivateRoute>}></Route>
      </Routes>
    </Router>
  </AuthProvider>

  

 
  );

}





export default App
