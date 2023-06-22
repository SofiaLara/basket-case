import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from './TableHeader';

describe('TableHeader Component', () => {
  test('renders table header with correct column names', () => {
    render(<table><TableHeader /></table>);
    const productColumn = screen.getByText('Product');
    const priceColumn = screen.getByText('Price');
    const quantityColumn = screen.getByText('Quantity');
    const costColumn = screen.getByText('Cost');

    expect(productColumn).toBeInTheDocument();
    expect(priceColumn).toBeInTheDocument();
    expect(quantityColumn).toBeInTheDocument();
    expect(costColumn).toBeInTheDocument();
  });
});