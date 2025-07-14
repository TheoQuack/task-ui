// src/components/AppInitializer.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllTasks from './api/getAllTasks';

function AuthChecker() {
  const navigate = useNavigate(); 

  const allTheTasks = async () => {
    try {
      await getAllTasks()
      .then((e)=>{  
            if (e.error){
            navigate('/login');
            console.log(e.error,'hello')
        }
      })  


    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      allTheTasks();
    }, 30);

    return () => {
      clearTimeout(timerId);
    };
  }, []);


   

  return null;
}

export default AuthChecker;