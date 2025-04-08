import ContactForm from '@/components/contact-form'
import ContactList from '@/components/contact-list'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import { getContactPages } from '@/lib/get-contacts'
import React from 'react'

const HomePage = async ({searchParams}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await getContactPages(query)
  return (
    <section className="p-4 sm:p-6">
      <div className='mx-auto max-w-screen-md border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm'>
        <div className='grid grid-cols-1 lg:grid-cols-8 gap-4'>
          <div className='col-span-1 lg:col-span-2 p-4 border-b lg:border-b-0 lg:border-r dark:border-gray-700'>
            <div className='flex flex-col gap-2'>
              <p className='tracking-widest text-xs title-font text-primary font-medium'>Adicionar Contato</p>
              <ContactForm />
            </div>
          </div>
          <div className='col-span-1 lg:col-span-6 p-4'>
            <div className='flex flex-col gap-6 sm:gap-8'>
              <div>
                <h2 className='title-font text-lg font-medium text-gray-800 dark:text-white'>Pesquisar</h2>
                <p className='tracking-widest text-xs title-font text-primary font-medium'>Pesquisar por nome ou email</p>
                <SearchBar />
              </div>
              <div className="overflow-x-auto">
                <ContactList query={query} currentPage={currentPage} />
              </div>
              <div className='flex justify-center items-center'>
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage