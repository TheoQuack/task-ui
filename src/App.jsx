import './App.css'
import Registration from './components/Registeration';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/HomePage';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProfileDashboard from './components/ProfileDashboard';
import LoginForm from './components/LoginForm';

function App() {

  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<LoginForm  />}></Route>
        <Route path="/tasks" element={<PrivateRoute><TaskList/></PrivateRoute>}></Route>
        <Route path='/newtask' element={<PrivateRoute><AddTaskForm/></PrivateRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute><ProfileDashboard/></PrivateRoute>}></Route>
      </Routes>
    </Router>
  </AuthProvider>

  

 
  );

}





export default App
