import { createContext, useContext, useState, useEffect } from 'react' // Import useEffect

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=>{
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored): null;
    })
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});

    // This useEffect will run whenever 'auth' state changes
    // It's a safer place to call checkAdminRole if it depends on auth being set
    useEffect(() => {
        if (auth && auth.token && auth.user) {
            // console.log("Auth state updated, checking admin role..."); // Optional: for debugging
            checkAdminRole();
            checkTheUser(); // Also call checkTheUser here if it depends on auth
        }
    }, [auth]); // Dependency array: run when 'auth' changes

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
        // The useEffect above will handle calling checkAdminRole and checkTheUser
        // once 'auth' state is updated.
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
        setIsAdmin(false); // Reset admin status on logout
        setUser({}); // Reset user data on logout
    }



    const checkAdminRole = async () => {
        // Add a check here as well, in case this function is called directly
        // before auth is fully populated (e.g., on initial load).
        if (!auth || !auth.token || !auth.user) {
            console.warn("Auth data not available for checkAdminRole.");
            setIsAdmin(false);
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${API_URL}/api/users/${auth.user}`, requestOptions);
            if (!response.ok) { // Check if response is successful
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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



    const checkTheUser = async () => {
        // Add a check here too
        if (!auth || !auth.token || !auth.user) {
            console.warn("Auth data not available for checkTheUser.");
            setUser({});
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${API_URL}/api/users/${auth.user}`, requestOptions);
            if (!response.ok) { // Check if response is successful
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error('Error fetching user data:', error); // Changed message for clarity
            setUser({}); // Clear user data on error
        }
    };



    return (
        <AuthContext.Provider value={{auth, isAdmin, user, checkTheUser, checkAdminRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);