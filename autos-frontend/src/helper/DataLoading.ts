import axios from "axios"
import { useEffect, Dispatch, SetStateAction } from "react"
import { URLs } from "../../../autos-backend/src/enums/URLs"

export const useEffectFetch =  (url: string, setListValues: Dispatch<SetStateAction<string[]>>) => {
    useEffect(() => {
    // valid brand
    const fetchData = async() => {   
      await axios.get(`${URLs.ORIGIN_SERVER}` + url, { withCredentials: true })
            
      .then(response => { 
            setListValues(response.data.tableValues);
             })
             .catch(error => console.log(error))
            }
    fetchData();
    }, [])
}


export const useEffectModel =  (url: string, setListValues: Dispatch<SetStateAction<string[]>>, selectedBrand: string) => {
  useEffect(() => {
      
  // valid brand
  const fetchData = async() => {   
    await axios.post(`${URLs.ORIGIN_SERVER}` + url, { selectedBrand }, { withCredentials: true })
          
    .then(response => { 
            //toast.success(response.data.message);
          setListValues(response.data.tableValues);
           })
           .catch(error => console.log(error))
  }
  if(selectedBrand) fetchData();
  }, [selectedBrand])
}