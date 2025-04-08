import React from 'react'
import ThemeToggle from './theme-toggle'

const Header = () => {
  return (
    <header className='py-2 px-4 border-b dark:border-gray-700'>
        <nav className='mx-auto max-w-screen-md'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='title-font text-lg sm:text-xl font-medium text-gray-800 dark:text-white'>The ContactHub</h1>
                    <p className='tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-300 hidden sm:block'>Seu organizador de contatos online</p>
                    <p className='tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-300 sm:hidden'>Organizador de contatos</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header