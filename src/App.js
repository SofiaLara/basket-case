import React, { useState, useMemo, useEffect} from 'react'
import useProductsGet from './hooks/useProductsGet'
import useProductsPost from './hooks/useProductsPost'
import { ProductDataContext } from './stores/useProductData'
import Table from './components/Table/Table.js'
import './App.css'

//TODO: All the strings to be in a content file
//TODO: Abstract buttons
//TODO: Implement input quantity
//TODO: Add jest preview

function App() {
  const [{ data, isFetching }] = useProductsGet()
  const [{ postProducts, isLoading }] = useProductsPost()
  const [productData, setProductData] = useState()
  const [totalCost, setTotalCost] = useState(0)

  //pass the initial states of the context as value in the provider
  const value = useMemo(
    () => ({ productData, setProductData, totalCost, setTotalCost }), 
    [totalCost, productData]
  )

  //get data from initial fetch and copy it in the context store
  useEffect(() => {
    if(data){
      setProductData(data)
    }
  }, [data, setProductData])

  //On click POST purchase request with updated data from the context
  const handlePostData = (e) => {
    e.preventDefault()

    const purchaseData = {
      products: productData,
      total: totalCost,
    }

    postProducts(purchaseData)
  }

  return (
    <>
      <header>
        <h1>Review Your Order &#38; Complete Checkout</h1>
      </header>
      <hr />
      <ProductDataContext.Provider value={value}>
        <main>
          <div className='table-wrapper'>
            <div className='table-wrapper__title'>
              <h2>Review Your Order</h2>
            </div>
            <div className='table-wrapper__content'>
            <Table isFetching={isFetching}/>
            </div>
          </div>
          <div className='buy-button'>
            <button className='btn btn__submit' onClick={handlePostData} disabled={totalCost === 0 || isLoading}>
              {isLoading ? 'Buying...' : 'Buy now'}
            </button>
          </div>
        </main>
      </ProductDataContext.Provider>
    </>
  )
}

export default App;
