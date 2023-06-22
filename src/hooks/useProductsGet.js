import { useState, useEffect, useCallback } from "react"
import axios from 'axios'

export default function useProductsGet() {
  const [data, setData] = useState()
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true)


  //declares the async data fetching function
  const getProducts = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.get('http://localhost:8000/products')

      setData(response.data)
      setIsDataFetched(true)
      setIsLoading(false)

    } catch (error) {
      console.error(error)
    }
  }, [])

  //calls the fetching function on mount
  useEffect(()=> { 
    if(!isDataFetched) {
      getProducts()
    }
  }, [getProducts, isDataFetched])

  return [{data, setData, isLoading}]
}