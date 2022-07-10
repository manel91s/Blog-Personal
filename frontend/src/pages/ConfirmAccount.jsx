import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';

const ConfirmAccount = () => {

  const params = useParams();

  const { token } = params;
  const [alert, setAlert ] = useState('');

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
      <h1 className="font-black text-6xl capitalize">Confirmar tu cuenta y Comienza a Crear tus {''}
      <span className="text-slate-700 text-orange-600"> publicaciones</span>
      </h1>
      {msg && <Alert alert = {alert }/>}
    </>
  )
}

export default ConfirmAccount