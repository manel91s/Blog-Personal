import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const ProtectedRoute = () => {

  const { auth, loading, setAuth } = useAuth();

  if(loading) return 'Cargando...';

  return (
    <>
      {auth._id ? 
      (
        <div className="bg-gray-100">
            <Header />
        <div className="md:flex md:min-h-screen">
          <Sidebar />

          <main className="p-10 md:flex-1">
            <Outlet/>
          </main>
        </div>
         
       <Footer/>
        </div>
      ) : <Navigate to="/" /> }
    </>
  )
}

export default ProtectedRoute