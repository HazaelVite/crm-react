import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { Alerta } from './Alerta';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export const Formulario = ({cliente, cargando}) => {
  const navigate = useNavigate()
  // schema
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, 'El nombre es muy corto')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string().required('La empresa del cliente es obligatorio'),
    email: Yup.string()
      .email('Email invalido')
      .required('El email del cliente es obligatorio'),
    telefono: Yup.number()
      .typeError('Solo se permiten números')
      .integer('Número no valido')
      .positive('Número no valido')
  })

  const handleSubmit = async(values) => {
    try {
      let respuesta
      if(cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
      } else {
        const url = 'http://localhost:4000/clientes'
        respuesta = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

      }
      await respuesta.json()
      navigate('/clientes')
      
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    cargando ? <Spinner /> : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
          {cliente?.id ? 'Editar cliente' : 'Agregar nuevo cliente'}
        </h1>
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? ''
          }}
          enableReinitialize = {true}
          onSubmit={ async(values, {resetForm}) => {
            await handleSubmit(values)

            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({ errors, touched }) => (
          <Form className='mt-10'>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='nombre'>Nombre: </label>
              <Field 
                type='text'
                id='nombre'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Nombre del cliente'
                name='nombre'
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null }
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='empresa'>Empresa: </label>
              <Field 
                type='text'
                id='empresa'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Empresa del cliente'
                name='empresa'
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null }
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='email'>Email: </label>
              <Field 
                type='email'
                id='email'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Email del cliente'
                name='email'
              />
              {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null }
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='telefono'>Telefono: </label>
              <Field 
                type='tel'
                id='telefono'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Telefono del cliente'
                name='telefono'
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null }
            </div>
            <div className='mb-4'>
              <label className='text-gray-800' htmlFor='notas'>Notas: </label>
              <Field 
                as='textarea'
                type='text'
                id='notas'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Notas del cliente'
                name='notas'
              />
              
            </div>
            <input 
              type="submit" 
              value={cliente?.id ? 'Editar cliente' : 'Agregar nuevo cliente'}
              className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
            />
          </Form>
          )}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando :false
}
