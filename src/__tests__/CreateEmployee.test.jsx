import React from 'react'
import { expect, test } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import CreateEmployee from '../pages/CreateEmployee/index.jsx';
import EmployeeList from '../pages/EmployeeList/index.jsx';

test('renders create employee form', () => {
  const { getByText, getByLabelText } = render(
    <BrowserRouter>
      <CreateEmployee />
    </BrowserRouter>
  );
  
  // Vérifie que les éléments de formulaire existent
  expect(getByText('Create Employee')).toBeInTheDocument();
  expect(getByLabelText('First Name')).toBeInTheDocument();
  expect(getByLabelText('Last Name')).toBeInTheDocument();
  expect(getByLabelText('Date of Birth')).toBeInTheDocument();
  expect(getByLabelText('Start Date')).toBeInTheDocument();
  expect(getByLabelText('Street')).toBeInTheDocument();
  expect(getByLabelText('City')).toBeInTheDocument();
  expect(getByLabelText('State')).toBeInTheDocument();
  expect(getByLabelText('Zip Code')).toBeInTheDocument();
  expect(getByLabelText('Department')).toBeInTheDocument();

  // Vérifie que le bouton "Save" existe
  expect(getByText('Save')).toBeInTheDocument();
});

test('form submission adds employee to datable', async () => {
  render(
    <BrowserRouter>
      <CreateEmployee />
    </BrowserRouter>
  );

  // Remplir le formulaire avec des données
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2024-05-01' } });
  fireEvent.change(screen.getByLabelText('Street'), { target: { value: '123 Main St' } });
  fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Anytown' } });
  fireEvent.change(screen.getByLabelText('State'), { target: { value: 'NY' } });
  fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '12345' } });
  fireEvent.change(screen.getByLabelText('Department'), { target: { value: 'Engineering' } });

  // Simuler la soumission du formulaire
  fireEvent.click(screen.getByText('Save'));

  // Attendre que le message de réussite s'affiche
  const successMessage = await screen.findByText('Employee Created');
  
  // Vérifier que le message de réussite est affiché
  expect(successMessage).toBeInTheDocument();

  render(
    <BrowserRouter>
      <EmployeeList />
    </BrowserRouter>
  );

  // Attendre que la DataTable se charge
  await waitFor(() => screen.getByText('Current Employees'));

  // Vérifier que le nouvel employé est présent dans la DataTable
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Doe')).toBeInTheDocument();
  expect(screen.getByText('1990-01-01')).toBeInTheDocument(); 
  expect(screen.getByText('123 Main St')).toBeInTheDocument(); 
  expect(screen.getByText('Anytown')).toBeInTheDocument(); 
  expect(screen.getByText('NY')).toBeInTheDocument(); 
  expect(screen.getByText('12345')).toBeInTheDocument();
  
  
});