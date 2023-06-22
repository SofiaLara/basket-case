import { createContext } from 'react';

export const initialState = {
    productData: [],
    setProductData: () => {},
    totalCost: 0,
    setTotalCost: () => {},
}

export const ProductDataContext = createContext({initialState});