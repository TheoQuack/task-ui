import './App.css'
import Registration from './components/userComponents/Registeration';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/userComponents/HomePage';
import AddTaskForm from './components/userComponents/AddTaskForm';
import TaskList from './components/userComponents/TaskList';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './protectedRoutes/PrivateRoute';
import ProfileDashboard from './components/userComponents/ProfileDashboard';
import LoginForm from './components/userComponents/LoginForm';
import UserList from './components/adminComponents/UserList';
import AdminRoute from './protectedRoutes/AdminRoute';

function App() {

  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<AdminRoute><Home/></AdminRoute>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<LoginForm  />}></Route>
        <Route path="/tasks" element={<PrivateRoute><TaskList/></PrivateRoute>}></Route>
        <Route path='/newtask' element={<PrivateRoute><AddTaskForm/></PrivateRoute>}></Route>
        <Route path='/profile' element={<PrivateRoute><ProfileDashboard/></PrivateRoute>}></Route>
        <Route path='/users' element={<PrivateRoute><UserList/></PrivateRoute>}></Route>
      </Routes>
    </Router>
  </AuthProvider>

  

 
  );

}





export default App
