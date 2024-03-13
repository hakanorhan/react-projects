import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from 'react-hot-toast'
import { URLs } from "../../../autos-backend/src/enums/URLs";

export interface FormDataModel {
  brandId: string,
  model: string,
  carTypeId: string,
  kW: string,
  hubraum: string,
  from: string | undefined,
  to: string | undefined,
  baureihe: string
}

export const handleSubmitPostBrand = async (value: any , url: string,
    setListValues: Dispatch<SetStateAction<any[]>>, setLoading: Dispatch<SetStateAction<boolean>>, setInsertId: Dispatch<SetStateAction<number | null>>) => {

    setLoading(true)
    // valid brand
    try {

      const response = await axios.post(`${URLs.ORIGIN_SERVER}${url}`, { value }, { withCredentials: true })
      toast.success(response.data.message);
      setListValues(response.data.tableValues);
      //setInsertId(response.data.insertId);

    } catch (error) {
      toast.error("Bitte versuchen Sie erneut");
    } finally {
      setLoading(false)
    }
  }

  export const handleSubmitPostModel = async (value: any , url: string, setLoading: Dispatch<SetStateAction<boolean>>) => {

    setLoading(true)
    // valid brand
    try {

      const response = await axios.post(`${URLs.ORIGIN_SERVER}${url}`, value, { withCredentials: true })
      toast.success(response.data.message);
      //setListValues(response.data.tableValues);
      //setInsertId(response.data.insertId);

    } catch (error) {
      toast.error("Bitte versuchen Sie erneut");
    } finally {
      setLoading(false)
    }
  }

  export const handleSubmitPostBaureihe = async (formDataModel: FormDataModel , setLoading: Dispatch<SetStateAction<boolean>>) => {

    setLoading(true)
    // valid brand
    try {

      const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_WRITE_BAUREIHE}`, { formDataModel }, { withCredentials: true })
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Bitte versuchen Sie erneut");
    } finally {
      setLoading(false)
    }
  }