import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export const VerCliente = () => {
  const [ cliente, setCliente ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async() => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) { 
        console.error('Error: ', error);
      }

      setTimeout(() => {
        setCargando(false)
        
      }, 2000);
    }

    obtenerClienteAPI()

  }, [])
  
  return (
    <div>
      {cargando ? <Spinner /> : (
        Object.keys(cliente).length === 0 ? (
          <>
            <h1 className="font-black text-4xl text-blue-900">Ups!</h1>
            <p className='mt-3'>No existe información del cliente que buscas.</p>
          </>
        ) : (
          <>
            <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Información del cliente</p>

            <p className='text-2xl text-gray-700 mt-10'>
              <span className="uppercase font-bold">Cliente: </span>
              {cliente.nombre}
            </p>
            <p className='text-2xl text-gray-700'>
              <span className="uppercase font-bold">Empresa: </span>
              {cliente.empresa}
            </p>
            <p className='text-2xl text-gray-700'>
              <span className="uppercase font-bold">Email: </span>
              {cliente.email}
            </p>
            {cliente.telefono && (
              <p className='text-2xl text-gray-700'>
                <span className="uppercase font-bold">Telefono: </span>
                {cliente.telefono}
              </p>
            )}
            {cliente.notas && (
              <p className='text-2xl text-gray-700'>
                <span className="uppercase font-bold">Notas: </span>
                {cliente.notas}
              </p>
            )}
          </>
        )
      )}
      
    </div>
  )
}
