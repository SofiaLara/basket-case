import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import OrderTable from './OrderTable';
import { ProductDataContext } from '../../stores/useProductData'

describe('OrderTable Component', () => {
  test('renders table rows for product data', () => {
    const setSubTotalMock = jest.fn();

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
            <table><OrderTable setSubTotal={setSubTotalMock} /></table>
        </ProductDataContext.Provider>
    );

    // Assert that the table rows are rendered correctly
    const product1Row = screen.getByText('Apple');
    const product2Row = screen.getByText('Banana');
    expect(product1Row).toBeInTheDocument();
    expect(product2Row).toBeInTheDocument();

    // Simulate clicking the plus button to increase quantity
    const plusButton = screen.getAllByTestId('plus-button');
    fireEvent.click(plusButton[0]);

    // Assert that the quantity is updated
    const quantityCell = screen.getAllByTestId('quantity-cell');
    expect(quantityCell[0].textContent).toBe('2');

    // Simulate clicking the minus button to decrease quantity
    const minusButton = screen.getAllByTestId('minus-button');
    fireEvent.click(minusButton[0]);

    // Assert that the quantity is updated
    expect(quantityCell[0].textContent).toBe('1');
  });
  test('clicks on the delete button and deletes the element', async () => {
    const setSubTotalMock = jest.fn();

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
            <table><OrderTable setSubTotal={setSubTotalMock}/></table>
        </ProductDataContext.Provider>
    );

    // Assert that the table rows are rendered correctly
    const product1Row = screen.getByText('Apple');
    const product2Row = screen.getByText('Banana');
    expect(product1Row).toBeInTheDocument();
    expect(product2Row).toBeInTheDocument();

    // Simulate clicking the delete button
    const deleteButton = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButton[0]);

    expect(setProductData).toHaveBeenCalled();
  });
});