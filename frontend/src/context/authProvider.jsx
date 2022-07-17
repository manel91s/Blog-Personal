import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {

        const userAuthenticate = async () => {

            const token = localStorage.getItem('token');
            if(!token) {
                return;
            }
            
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
                })
                
                const data = await response.json();
          
                if(response.ok) {
                 setAuth(data);
                }
          
                throw new Error(data.msg);
          
              }catch(error) {
                console.log(error)
              }
        }

        userAuthenticate();
    }, [])
    
    return (
        <AuthContext.Provider
            value={{
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;