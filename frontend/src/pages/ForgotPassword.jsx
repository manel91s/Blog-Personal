import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';

import React from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email.trim() === '') {
      setAlert({
        msg: 'El campo email es obligatorio',
        error:true
      })
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
          email
        }),
        headers: {
          'Content-Type': 'application/json'
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
        <h1 className="font-black text-6xl capitalize">Recupera tu acceso y no pierdas tus
          <span className="text-slate-700 text-orange-600"> proyectos </span>
        </h1>
    {msg && <Alert alert= {alert} />}
    <form 
      className="my-10 bg-white shadow px-10 py-5"
      onSubmit={handleSubmit}
      >
    <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
              >Email</label>
    <input 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder="Email de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            />
    <input 
        type="submit" 
        value="Enviar Instrucciones"
        className="bg-orange-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-800 transition-colors text-center mt-5"
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
            to="/registrar"
          >
          ¿No tienes una cuenta? Regístrate</Link>
    </nav>
    </>
  )
}

export default ForgotPassword