import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';
import { ProductDataContext } from '../../stores/useProductData'

describe('Table Component', () => {
  test('renders loading message when isFetching is true', () => {
    render(<Table isFetching={true} />);
    const loadingMessage = screen.getByText('Getting your products ready...');
    expect(loadingMessage).toBeInTheDocument();
  });

  test('renders the table when isFetching is false', () => {
    const setTotalCost = jest.fn();
    const setProductData = jest.fn();
    const totalCost = 3;
    const productData = [
        {
          "product": "Apple",
          "price": 0.52,
          "quantity": 1,
          "id": 0
        },
        {
          "product": "Banana",
          "price": 0.67,
          "quantity": 1,
          "id": 1
        }
      ];

    const value = { productData, setProductData, totalCost, setTotalCost }
    
    render(
        <ProductDataContext.Provider value={value}>
            <Table isFetching={false}/>
        </ProductDataContext.Provider>
    );
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});