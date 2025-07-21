
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=>{
        const stored = localStorage.getItem("Auth");
        return stored ? JSON.parse(stored): null;
    })

    const login = async({email, password}) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content_Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });

    if (!res.ok) throw new Error("Login Failed");

    const data = await res.json();

    const authData = {
        user: data.user,
        token: data.token
    };

    setAuth(authData);
    localStorage.setitem('auth', JSON.stringify(authData));
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