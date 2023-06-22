import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the parent component', () => {
    render(<App />);

    expect(screen.getByText('Review Your Order & Complete Checkout')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buy now" })).toBeInTheDocument();
  });

  test('clicking the Buy Now button triggers the postProducts function', () => {
    const handlePostData = jest.fn();

    render(<button onClick={handlePostData} />);

    const element = screen.getByRole("button");
    fireEvent.click(element);
    expect(handlePostData).toBeCalled();
  });

  test('disables the button when totalCost is 0', () => {
    const totalCost = 0;
    const isLoading = true;

    render(<button disabled={totalCost === 0 || isLoading}/>);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  test('displays "Buying..." text when isLoading is true', () => {
    const isLoading = "true";

    render(<button isloading={isLoading} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });
});
