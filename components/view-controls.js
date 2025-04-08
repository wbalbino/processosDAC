'use client'
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Tooltip from './tooltip';

const ViewControls = ({ sortField, sortOrder, onSortChange }) => {
  const sortFields = [
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'createdAt', label: 'Data de Criação' }
  ];

  return (
    <div className="flex items-center justify-end gap-4 mb-6">
      {/* Controles de Ordenação */}
      <div className="flex items-center space-x-2">
        <Tooltip text="Selecione o campo para ordenar os contatos">
          <select
            value={sortField}
            onChange={(e) => onSortChange(e.target.value, sortOrder)}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortFields.map((field) => (
              <option key={field.value} value={field.value}>
                Ordenar por: {field.label}
              </option>
            ))}
          </select>
        </Tooltip>
        <Tooltip text={sortOrder === 'asc' ? 'Ordenar em ordem decrescente' : 'Ordenar em ordem crescente'}>
          <button
            onClick={() => onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {sortOrder === 'asc' ? (
              <FiArrowUp className="h-5 w-5" />
            ) : (
              <FiArrowDown className="h-5 w-5" />
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ViewControls; 