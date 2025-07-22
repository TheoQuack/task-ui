
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { auth } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const checkAdminRole = async () => {
            if (auth?.token && auth?.user) {
                setIsLoading(true);
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${auth.token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                try {
                    const response = await fetch(`${API_URL}/api/users/${auth.user}`, requestOptions);
                    const result = await response.json();

                    if (result.role === "administrator") {
                        console.log("admin accessed");
                        setIsAdmin(true);
                    } else {
                        console.log("Not Admin");
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setIsAdmin(false);
                } finally {
                    setIsLoading(false); 
                }
            } else {
                setIsLoading(false); 
                setIsAdmin(false);
            }
        };

        checkAdminRole();
    }, [auth]); 

    if (isLoading) {
        return <div>Loading authentication...</div>;
    }

    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;
