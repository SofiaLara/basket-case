import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { ProductDataContext } from '../../stores/useProductData'
import './TotalCost.css'

function TotalCosts({subTotal}) {
    const {totalCost, setTotalCost} = useContext(ProductDataContext)
    const vat = parseFloat((subTotal * 0.2).toFixed(2))

    //updates the total cost in the context to be used by the purchase object
    useEffect(()=>{
        const total = parseFloat((subTotal + vat).toFixed(2));
        setTotalCost(parseFloat((total).toFixed(2)))
    }, [subTotal, setTotalCost, vat])

  return (
    <tfoot>
        <tr>
            <td>Subtotal:</td>
            <td colSpan="3"></td>
            <td className='right' data-testid="subtot">£{subTotal}</td>
        </tr>
        <tr>
            <td>VAT (20%):</td>
            <td colSpan="3"></td>
            <td className='right' data-testid="vat">£{vat}</td>
        </tr>
        <tr className='total-cost'>
            <td>Total Cost:</td>
            <td colSpan="3"></td>
            <td className='right' data-testid="total">£{totalCost}</td>
        </tr>
    </tfoot>
    )
}

export default TotalCosts;

TotalCosts.propTypes= {
    subTotal: PropTypes.number.isRequired,
  }