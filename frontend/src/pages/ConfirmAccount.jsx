import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const params = useParams();
  const { token } = params;

  const [alert, setAlert ] = useState('');
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  useEffect(() => { 
    const confirmAccount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/confirm/${token}`);

        const data = await response.json();

        if(response.ok) {
          setAlert({
            msg: data.msg,
            error:false
          })
          setAccountConfirmed(true);
          return;
        }
        throw new Error(data.msg)

      }catch(error) {
        setAlert({
          msg: error.message,
          error:true
        })
      }
    }
    
    confirmAccount();
  }, []);

  const { msg } = alert;
  
  return (
    <>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        <h1 className="font-black text-6xl capitalize">Confirmar tu cuenta y Comienza a Crear tus {''}
        <span className="text-slate-700 text-orange-600"> publicaciones</span>
        </h1>
        {msg && <Alert alert = {alert }/>}
        {accountConfirmed && (
          <Link
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to="/registrar"
            >
            Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount