import { useEffect } from "react";
import useAuth from "../hooks/useAuth"

const Posts = () => {

  const { auth } = useAuth();

  useEffect(() => {
      const getPosts = async () => {
        
        const token = localStorage.getItem('token');

        if(!token) {
          return;
        }

        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
          })

          const data = await response.json();

          if(response.ok) {
            console.log(data);
          }

          throw new Error(data.error)
        }catch(error) {
          console.log(error.message);
        }
      }

      getPosts();
  }, [])
  
  return (
    <div>Posts</div>
  )
}

export default Posts