import React, {useState, useEffect, useCallback, useContext} from 'react'
import PropTypes from 'prop-types'
import { ProductDataContext } from '../../stores/useProductData'
import './OrderTable.css'

function OrderTable({setSubTotal}) {
  const [hasChanged, setHasChanged] = useState(false)
  const [quantity, setQuantity] = useState([])
  const {productData, setProductData} = useContext(ProductDataContext)

  //Initialise with default quantities
  useEffect(() => {
    if (productData && productData.length > 0 && !hasChanged) {
      setQuantity(productData.map(() => 1))
    }
  }, [hasChanged, productData])

  //increases the quantites number and set it the correspondent object
  const handleIncrease = (i) => {
    setHasChanged(true)
    setQuantity((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      newQuantities[i] += 1
      return newQuantities
    });
    setProductData((prevData) => {
      const newData = [...prevData]
      newData[i].quantity = quantity[i] + 1
      return newData
    });
  };

  //decreases the quantites number and set it the correspondent object
  const handleDecrease = (i) => {
    setHasChanged(true)
    setQuantity((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      if (newQuantities[i] > 1) {
        newQuantities[i] -= 1
      }
      return newQuantities
    });
    setProductData((prevData) => {
      const newData = [...prevData]
      newData[i].quantity = quantity[i] - 1
      return newData
    });
  };

  //deletes quantities and item from product data
  const handleDelete = (i) => {
    setHasChanged(true)
    setQuantity((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      newQuantities.splice(i, 1)
      return newQuantities
    });
    setProductData((prevData) => {
      const newData = [...prevData]
      newData.splice(i, 1)
      return newData
    });
  };

  const calculateCost = (price, quantity) => {
    return (price * quantity).toFixed(2)
  };

  //calculate subtotal prices and set it in the context
  const calculateSubTotal = useCallback(() => {
    let total = 0;

    if (productData && productData.length > 0) {
        for (let i = 0; i < productData.length; i++) {
          total += productData[i].price * quantity[i]
        }

        setSubTotal(parseFloat(total.toFixed(2)))
    }

    if(quantity.length === 0) {
      setSubTotal(0)
    }
  }, [productData, quantity, setSubTotal]);

  useEffect(() => {
    calculateSubTotal()
  }, [calculateSubTotal, quantity])

  return (
    <tbody>
            {productData && productData.length > 0 && productData.map((item, i) => (
                <tr key={i}>
                    <td>{item.product}</td>
                    <td>£{item.price}</td>
                    <td>
                        <span data-testid="quantity-cell">{quantity[i]}</span>
                        <button
                            type="plus"
                            onClick={() => handleIncrease(i)}
                            className='btn btn__plus'
                            data-testid="plus-button"
                        >+</button>
                        <button
                            type="minus"
                            onClick={() => handleDecrease(i)}
                            className='btn btn__minus'
                            data-testid="minus-button"
                        >-</button>
                    </td>
                    <td>£{calculateCost(item.price, quantity[i])}</td>
                    <td className='right'><button
                        type="delete"
                        onClick={() => handleDelete(i)}
                        className='btn btn__delete'
                        data-testid="delete-button"
                    >Delete</button></td>
                </tr>
            ))}
    </tbody>     
    )
}

export default OrderTable;

OrderTable.propTypes= {
  setSubTotal: PropTypes.func.isRequired,
}