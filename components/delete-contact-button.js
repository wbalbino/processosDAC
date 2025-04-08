'use client'
import React, { useState } from 'react';
import { FiTrash, FiEdit2 } from 'react-icons/fi';
import toast, {Toaster} from 'react-hot-toast';
import { deleteContact } from '@/lib/delete-contact';
import Tooltip from './tooltip';
import Link from 'next/link';

const DeleteContact = ({ contact }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await deleteContact(contact.id);
      toast.success('Contato deletado com sucesso');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar contato:', error);
      toast.error('Erro ao deletar contato');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip text="Editar contato">
        <Link 
          href={`/${contact.id}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FiEdit2 className="h-4 w-4" />
        </Link>
      </Tooltip>
      <Tooltip text="Excluir contato">
        <button
          onClick={() => setIsOpen(true)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <FiTrash className="h-4 w-4" />
        </button>
      </Tooltip>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Confirmar Exclusão</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tem certeza que deseja excluir o contato de {contact.name}? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <Tooltip text="Cancelar exclusão">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </Tooltip>
              <form onSubmit={handleDelete}>
                <input type="hidden" id="id" name="id" defaultValue={contact.id} />
                <Tooltip text="Confirmar exclusão do contato">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </Tooltip>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteContact;