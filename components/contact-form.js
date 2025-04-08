'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {Toast, Toaster, toast} from "react-hot-toast"
import { addContact } from '@/lib/add-contact'
import { updateContact } from '@/lib/update-contact'
import { useRouter } from 'next/navigation'

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email informado é inválido").required("Email é obrigatório")
})

const ContactForm = ({contact}) => {
  const router = useRouter()
  const {handleSubmit, control, reset, formState} = useForm({
    resolver: yupResolver(schema),
    defaultValues: contact ? {name: contact.name, email: contact.email} : {}
  })

  const {errors, isSubmitting} = formState
  const onSubmit = async (data) => {
    try {
      if(contact){
        await updateContact({id: contact.id, ...data});
        toast.success("Informações do contato atualizadas com sucesso!", {
          duration: 2000,
        })
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else{
        await addContact(data);
        toast.success("Novo contato adicionado com sucesso!", {
          duration: 2000,
        })
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
      reset()
    } catch (error) {
        toast.error("Erro ao processar o formulário: " + error.message, {
          duration: 4000,
        })
        console.error("Erro:", error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</span>
            <Controller
              name='name'
              control={control}
              render={({field}) => (
                <input
                  {...field}
                  className='w-full border rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:border-gray-500'
                />
              )}
            />
            {errors.name && (
              <span className='text-red-600 text-sm animate-fade-in transition-opacity duration-200'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
            <Controller
              name='email'
              control={control}
              render={({field}) => (
                <input
                  {...field} 
                  className='w-full border rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out hover:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:border-gray-500'
                />
              )}
            />
            {errors.email && (
              <span className='text-red-600 text-sm animate-fade-in transition-opacity duration-200'>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <button
          className={`mt-4 w-full bg-primary rounded-md py-2 px-3 text-white transition-all duration-200 ease-in-out hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:active:scale-100 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          <span className="flex items-center justify-center">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </span>
        </button>
      </form>
      <Toaster 
        position='top-center'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default ContactForm