'use client'
import React, { useState, useEffect } from 'react';
import DeleteContact from './delete-contact-button';
import ViewControls from './view-controls';

const ContactList = ({ query, currentPage }) => {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`/api/contacts?query=${query}&page=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`);
        const data = await response.json();
        setContacts(data.contacts);
        setTotal(data.total);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    };

    fetchContacts();
  }, [query, currentPage, sortField, sortOrder]);

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <ViewControls
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {total === 0 ? (
            'Nenhum contato encontrado'
          ) : total === 1 ? (
            '1 contato encontrado'
          ) : (
            `${total} contatos encontrados`
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-4 border-b dark:border-gray-700 last:border-0">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{contact.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{contact.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{contact.phone}</p>
            </div>
            <DeleteContact contact={contact} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;