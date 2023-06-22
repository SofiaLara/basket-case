import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TableHeader from '../TableHeader/TableHeader.js'
import OrderTable from '../OrderTable/OrderTable.js'
import TotalCosts from '../TotalCosts/TotalCosts.js'
import './Table.css'

function Table({isFetching}) {
  const [subTotal, setSubTotal] = useState(0)

  if (isFetching){
    return 'Getting your products ready...'
  }

  return (
    <>
        {!isFetching && (
            <table>
                <TableHeader/>
                <OrderTable setSubTotal={setSubTotal}/>
                <TotalCosts subTotal={subTotal}/>
            </table>
        )}
    </>
  );
}

export default Table;

Table.propTypes= {
    isFetching: PropTypes.bool,
}
