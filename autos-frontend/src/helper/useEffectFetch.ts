import axios from "axios"
import { useEffect, Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import { URLs } from "../../../autos-backend/src/enums/URLs"

export const useEffectFetch =  (setLoading: Dispatch<SetStateAction<boolean>>, url: string, setListValues: Dispatch<SetStateAction<string[]>>) => {
    useEffect(() => {
        setLoading(true)
    // valid brand
    const fetchData = async() => {   
      await axios.get(`${URLs.ORIGIN_SERVER}` + url, { withCredentials: true })
            
      .then(response => { 
              toast.success(response.data.message);
              console.log(response.data.message);
            setListValues(response.data.tableValues);
             })
             .catch(error => console.log(error))
            setLoading(false)
    }
    fetchData();
    }, [])
}