import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <div className="border-orange-200">
                <h2 className="text-4xl text-orange-600 font-black text-center">
                    MA.
                </h2>
            </div>

            <input
                type="search"
                placeholder='Buscar un Post'
                className='border-2 lg:w-96 block p-2 border'
            />

            <div className="flex items-center gap-4">
                <Link 
                    to="/posts"
                    className="font-bold uppercase"
                >Posts</Link>

                <button
                    type="button"
                    className="text-white text-sm bg-orange-600 p-3 rounded-md uppercase font-bold m"
                >Cerrar Sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header