import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=>{
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored): null;
    })
    const [isAdmin, setIsAdmin] = useState(false);

    const login = async({email, password}) => {
        const res = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error("Login Failed");
        const data = await res.json();
        const authData = {
            user: data.userID,
            token: data.token
        };
        setAuth(authData);
        localStorage.setItem('auth', JSON.stringify(authData));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    }






    const checkAdminRole = async () => {
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
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                setIsAdmin(false);
            }
    };









    return (
        <AuthContext.Provider value={{auth, isAdmin, checkAdminRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);