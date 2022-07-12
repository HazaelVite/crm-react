import { Outlet, NavLink, useLocation } from 'react-router-dom'


export const Layout = () => {
  const location = useLocation()
  const urlActual = location.pathname

  return (
    <div className='md:flex md:min-h-screen'>

      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h1 className="text-4xl font-black text-center text-white">CRM - Clientes</h1>
        <nav className="mt-10">
          <NavLink 
            to='/clientes' 
            className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'}  text-2xl block mt-2 hover:text-blue-300`}
          >Clientes</NavLink>
          <NavLink 
            to='/clientes/nuevo' 
            className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
          >Nuevo cliente</NavLink>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
      
    </div>
    
  )
}
