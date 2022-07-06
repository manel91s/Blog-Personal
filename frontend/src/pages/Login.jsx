
const Login = () => {
  return (
    <>
        <h1 className="font-black text-6xl capitalize">Inicia sesión y administra tus
        
        <span className="text-slate-700 text-orange-600"> publicaciones</span>

        </h1>

        <form className="my-10 bg-white shadow">
          <div>
            <label>Email</label>
            <input type="email" placeholder="Email de registro" className="" />
          </div>
        </form>
    </>
  )
}

export default Login