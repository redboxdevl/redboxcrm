import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ListDealForm from './ListDealForm';

jest.mock('../../../Includes/OtherNavigation', () => () => null);

test('contains Petty Cash actions while preserving the Deal Form routes', () => {
  render(
    <MemoryRouter initialEntries={['/deal-form-list']}>
      <Routes>
        <Route path="/deal-form-list" element={<ListDealForm />} />
        <Route path="/add-deal-form" element={<h1>New Deal Form</h1>} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Deal Form List' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('connected to Petty Cash data');
  expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /petty cash|view|update/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Add New Deal Form' }));
  expect(screen.getByRole('heading', { name: 'New Deal Form' })).toBeInTheDocument();
});