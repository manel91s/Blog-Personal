import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
        <h1 className="font-black text-6xl capitalize">Inicia sesión y administra tus
        
        <span className="text-slate-700 text-orange-600"> publicaciones</span>

        </h1>

        <form className="my-10 bg-white shadow px-10 py-5">
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
              >Email</label>
              
            <input 
            type="email" 
            placeholder="Email de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
          </div>
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
              >Password</label>
              
            <input 
            type="email" 
            placeholder="Password de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
          </div>

          <input 
            type="text" 
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