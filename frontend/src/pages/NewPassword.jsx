import { Link } from 'react-router-dom';

const newPassword = () => {
  return (
    <>
    <h1 className="font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus
    <span className="text-slate-700 text-orange-600"> publicaciones</span>

    </h1>

    <form className="my-10 bg-white shadow px-10 py-5">
      <div className="my-5">
              <label 
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
                >Nuevo Password</label>
                
              <input 
              type="password" 
              placeholder="Escribe tu nuevo password" 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50" />
            </div>

            <input 
            type="text" 
            value="Guardar Nuevo Password"
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
      ¿No tienes una cuenta? Registrate</Link>

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