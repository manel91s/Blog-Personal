import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';



const Login = () => {
  
  const [userLogin, setUserLogin] = useState({email:'', password: ''});
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = userLogin;

    if([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return;
    }

    if(password.length < 8 || password.length > 16) {
      setAlert({
        msg: 'La contraseña tiene que tener entre 8 y 16 caracteres',
        error: true
     })
     return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      
      const data = await response.json();

      if(response.ok) {
        setAlert({})
        localStorage.setItem('token', data.token)
        setAuth(data);
        return;
      }

      throw new Error(data.msg);

    }catch(error) {
      setAlert({
        msg: error.message,
        error: true
      })
    }
  }

  const { msg } = alert;

  return (
    <>
        <h1 className="font-black text-6xl capitalize">Inicia sesión y administra tus
        
        <span className="text-slate-700 text-orange-600"> publicaciones</span>

        </h1>

        {msg && <Alert alert = {alert} />}
        <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow px-10 py-5"
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
              >Email</label>
              
            <input 
            onChange={(e) => {setUserLogin({...userLogin, [e.target.name] : e.target.value })}}
            type="email" 
            name="email"
            placeholder="Email de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
          </div>
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
              >Password</label>
              
            <input
            onChange={(e) => {setUserLogin({...userLogin, [e.target.name] : e.target.value })}}
            type="password" 
            name="password"
            placeholder="Password de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
          </div>

          <input 
            type="submit" 
            value="Iniciar Sesión"
            className="bg-orange-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-800 transition-colors text-center"
            />
        </form>

        <nav 
          className="lg: flex lg:justify-between"
        >
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/registrar"
          >
          ¿No tienes una cuenta? Regístrate</Link>

          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/olvide-password"
          >
          Olvide mi password</Link>
        </nav>
    </>
  )
}

export default Login