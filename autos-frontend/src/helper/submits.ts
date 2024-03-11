import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from 'react-hot-toast'
import { URLs } from "../../../autos-backend/src/enums/URLs";

export const handleSubmitPostData = async (value: any ,props: any,
    setListValues: Dispatch<SetStateAction<any[]>>, setLoading: Dispatch<SetStateAction<boolean>>, setInsertId: Dispatch<SetStateAction<number | null>>) => {

    setLoading(true)
    // valid brand
    try {

      const response = await axios.post(`${URLs.ORIGIN_SERVER}${props.url}`, { value }, { withCredentials: true })
      toast.success(response.data.message);
      setListValues(response.data.tableValues);
      setInsertId(response.data.insertId);

    } catch (error) {
      toast.error("Bitte versuchen Sie erneut");
    } finally {
      setLoading(false)
    }
  }