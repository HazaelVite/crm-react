import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { Formulario } from '../components/Formulario'

export const EditarCliente = () => {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `https://my-json-server.typicode.com/HazaelVite/crm-react/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.error('Error: ', error);
      }
      setCargando(false)
    }

    obtenerClienteAPI()

  }, [])

  return (
    <>
      {cliente?.id ? (
        <>
          <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
          <p className='mt-3'>Utiliza este formulario para editar datos del cliente</p>
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        </>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">Ups!</h1>
          <p className='mt-3'>No existe información del cliente que buscas.</p>
        </>
      )}
    </>
  )
}
