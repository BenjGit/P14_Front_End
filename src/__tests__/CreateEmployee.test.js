import { render, fireEvent } from '@testing-library/react';
import CreateEmployee from '../pages/CreateEmployee';

test('renders create employee form', () => {
  const { getByText, getByLabelText } = render(<CreateEmployee />);
  
  // Vérifie que les éléments de formulaire existent
  expect(getByText('Create Employee')).toBeInTheDocument();
  expect(getByLabelText('First Name')).toBeInTheDocument();
  expect(getByLabelText('Last Name')).toBeInTheDocument();
  // Ajoutez d'autres vérifications pour les éléments de formulaire restants

  // Vérifie que le bouton "Save" existe
  expect(getByText('Save')).toBeInTheDocument();
});

test('form submission adds employee', () => {
  const { getByLabelText, getByText } = render(<CreateEmployee />);
  
  // Simule la saisie des informations dans les champs de formulaire
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  // Ajoutez d'autres événements de changement pour les autres champs de formulaire

  // Simule la soumission du formulaire
  fireEvent.click(getByText('Save'));

  // Vérifie que le nouvel employé a été ajouté
  expect(getByText('Employee Created')).toBeInTheDocument();
});