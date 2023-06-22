import {useCallback, useState} from "react"
import axios from 'axios'

export default function useProductsPost() {
    const [isLoading, setIsLoading] = useState(false);
  
    const postProducts = useCallback(async (postData) => {
      setIsLoading(true);

      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      try {
        const response = await axios.post('http://localhost:8000/purchase', postData, config);
        alert(`Your purchase has been successful! We have received £${response.data.total}`)
  
        setIsLoading(false);
      } catch (error) {
        console.error(error.response.data);
        setIsLoading(false);
      }
    }, []);
  
    return [{postProducts, isLoading}];
  }