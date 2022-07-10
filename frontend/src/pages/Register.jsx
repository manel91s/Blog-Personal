import { useState } from 'react';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';

const Register = () => {

  const [user, setUser ] = useState({name: '', surname: '', email:'', password: '', passwordConfirmation: ''});
  const [alert, setAlert ] = useState('');

  const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name] : e.target.value 
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, surname, email, password, passwordConfirmation } = user;

    if([name, surname, email, password, passwordConfirmation].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
     })
     return;
    }

    if(password !== passwordConfirmation) {
      setAlert({
        msg: 'Las contraseñas introducidas no coincidien',
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

    setAlert({
      name: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })
   
    //Create user in API
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method:'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data  = await response.json();

      if(response.ok) {
        setAlert({
          msg: data.msg,
          error: false
        })
        setUser({name:'', surname: '', email: '', password: '', passwordConfirmation: ''} ) 
        return;
      }
      throw new Error(data.msg)
    } catch(error){
      setAlert({
        msg: error.message,
        error: true
      })
    }
  
  }

  const { msg } = alert;

  return (
    <>
    <h1 className="font-black text-6xl capitalize">Crea tu cuenta y administra tus
    
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
          >Nombre</label>
          
        <input
        onChange={handleChange}
        id="name"
        name="name"
        type="text" 
        placeholder="Tu nombre"
        value = {user.name}
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>

      <div className="my-5">
        <label 
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="apellidos"
          >Apellidos</label>
          
        <input 
        onChange={handleChange}
        type="text" 
        id="surname"
        name="surname"
        placeholder="Email de registro"
        value = {user.surname}
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>

      <div className="my-5">
        <label 
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="email"
          >Email</label>
          
        <input
        onChange={handleChange}
        type="email" 
        placeholder="Email de registro" 
        name="email"
        value = {user.email}
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>
      <div className="my-5">
        <label 
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="password"
          >Password</label>
          
        <input 
        onChange={handleChange}
        value={user.password}
        type="password" 
        placeholder="Password de registro" 
        name="password"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>

      <div className="my-5">
        <label 
          className="uppercase text-gray-600 block text-xl font-bold"
          htmlFor="passwordConfirmation"
          >Repetir Password</label>
          
        <input
        onChange={handleChange}
        value={user.passwordConfirmation}
        id="passwordConfirmation" 
        type="password"
        name="passwordConfirmation"
        placeholder="Repetir tu Password" 
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
      </div>

      <input 
        type="submit" 
        value="Crear Cuenta"
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
      ¿Ya tienes una cuenta? Inicia Sesión</Link>

      <Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to="/olvide-password"
      >
      Olvide mi password</Link>
    </nav>
</>
  )
}

export default Register