import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalCosts from './TotalCosts';
import { ProductDataContext } from '../../stores/useProductData';

describe('TotalCosts Component', () => {
  test('renders total costs correctly', () => {
    const subTotal = 2;
    const setTotalCost = jest.fn();
    const vat = parseFloat((subTotal * 0.2).toFixed(2));
    const totalCost = parseFloat((subTotal + vat).toFixed(2));

    const value = {totalCost, setTotalCost }

    render(
      <ProductDataContext.Provider value={value}>
       <table><TotalCosts subTotal={subTotal} /></table>
      </ProductDataContext.Provider>
    );

    // Assert that the subtotal, VAT, and total cost are rendered correctly
    const subTotalRow = screen.getAllByTestId('subtot');
    const vatRow = screen.getAllByTestId('vat');
    const totalCostRow = screen.getAllByTestId('total');

    expect(subTotalRow[0]).toBeInTheDocument();
    expect(subTotalRow[0].textContent).toBe('£2');
    expect(vatRow[0]).toBeInTheDocument();
    expect(vatRow[0].textContent).toBe('£0.4');
    expect(totalCostRow[0]).toBeInTheDocument();
    expect(totalCostRow[0].textContent).toBe('£2.4');
  });
});