import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const userAuthenticate = async () => {

            const token = localStorage.getItem('token');
            if(!token) {
                setLoading(false);
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
                 navigate('/posts');
                 return;
                }
          
                throw new Error(data.msg);
          
              }catch(error) {
                setAuth({})
              } finally {
                setLoading(false);
              }
        }

        userAuthenticate();
    }, [])
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
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