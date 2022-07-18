import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola : Manel</p>

        <Link
            to="crear-post"
            className="bg-orange-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center"
        >Crear Post</Link>
    </aside>
  )
}

export default Sidebar