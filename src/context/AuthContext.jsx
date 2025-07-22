
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export const AuthProvider = ({children}) => {


    const [auth, setAuth] = useState(()=>{
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored): null;
    })

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

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);