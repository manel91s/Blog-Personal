import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alert from '../components/Alert';


const newPassword = () => {

  const params = useParams();
  const { token } = params;

  const [alert, setAlert] = useState({});
  const [ isValidToken, setIsValidToken ] = useState(false);

  const [ forgotPassword, setForgotPassword ] = useState({newPassword : '', passwordConfirmation: ''});

  const { newPassword, passwordConfirmation } = forgotPassword;
 
  useEffect(() => {
    const checkToken = async () => {

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/restore-password/${token}`);

        const data = await response.json();
        
        if(response.ok) {
          setIsValidToken(true);
          return;
        }

        throw new Error(data.msg)
      }catch(error) {
        setAlert({
          msg: error.message,
          error: true
        })
      }
    }
    checkToken();
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault();

    if(newPassword.trim() === '' || passwordConfirmation === '') {
      setAlert({
        msg: 'Los campos son obligatorios',
        error: true
      })
      return;
    }

    if(newPassword !== passwordConfirmation) {
      setAlert({
        msg: 'Las contraseñas no coincididen',
        error: true
      })
      return;
    }

    if(newPassword.length < 8 || newPassword.length > 16) {
      setAlert({
        msg: 'La contraseña tiene que tener entre 8 y 16 caracteres',
        error: true
     })
     return;
    }

    //add token in the new object
    const newPasswordRequest = {
      ...forgotPassword,
      token
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/restore-password`, {
        method: 'PATCH',
        body: JSON.stringify(newPasswordRequest),
        headers: {
          'Content-Type': 'application/json',
        }
      })
     
      const data = await response.json();
      if(response.ok) {
        setAlert({
          msg: data.msg,
          error: false
        })
        return;
      }

      throw new Error(data.msg);
      
    } catch(error) {
      setAlert({
        msg: error.message,
        error: true
      })
    }

  }

  const { msg } = alert;

  return (
    <>
    <h1 className="font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus
    <span className="text-slate-700 text-orange-600"> publicaciones</span>
    </h1>
    {msg && <Alert alert={alert} />}

    {isValidToken ? ( 
      <form 
      onSubmit = {handleSubmit}
      className="my-10 bg-white shadow px-10 py-5"
    >
      <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
                >Nuevo Password</label>
                
              <input 
              onChange={(e) => setForgotPassword({...forgotPassword, [e.target.name] : e.target.value })}
              type="password"
              name="newPassword"
              placeholder="Escribe tu nuevo password" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>

      <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
                >Confirmar Password</label>
                
              <input 
              onChange={(e) => setForgotPassword({...forgotPassword, [e.target.name] : e.target.value })}
              type="password"
              name="passwordConfirmation"
              placeholder="Escribe de nuevo tu password" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
            

            <input 
            type="submit" 
            value="Guardar Nuevo Password"
            className="bg-orange-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-800 transition-colors text-center"
            />
    </form>

    ) : ''}
    
    <nav 
      className="lg: flex lg:justify-between"
    >
      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to="/"
      >
      Iniciar Sesión</Link>

      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to="/olvide-password"
      >
      Olvide mi password</Link>
    </nav>
</>
  )
}

export default newPassword