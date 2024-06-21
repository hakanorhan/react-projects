import axios from "axios"
import { useEffect, Dispatch, SetStateAction } from "react"
import { URLs } from "../constants/values.ts"
import { notifyError } from "./toastHelper.ts"

export const useEffectFetch =  (url: string, setListValues: Dispatch<SetStateAction<string[]>>) => {
    useEffect(() => {
    // valid brand
    const fetchData = async() => {   
      const response = await axios.get(`${URLs.ORIGIN_SERVER}` + url, { withCredentials: true })
      try {

        setListValues(response.data.tableValues);  
      } catch (error: any) {
        notifyError(error.response.data.messageId, error.response.data.message);
      }
      }

    fetchData();
    }, [])
}

 export const useEffectModel =  (url: string, setListValues: Dispatch<SetStateAction<string[]>>, selectedBrand: string) => {
  useEffect(() => {
  // valid brand
  const fetchData = async() => {
    await axios.post(`${URLs.ORIGIN_SERVER}` + url, { selectedBrand } , { withCredentials: true })
          
    .then(response => { 

            //toast.success(response.data.message);
          setListValues(response.data.tableValues);
           })
           .catch(error => notifyError(error.response.data.messageId, error.response.data.message))
  }
  if(selectedBrand) fetchData();
  }, [selectedBrand])
}