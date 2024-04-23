import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from 'react-hot-toast'
import { URLs } from "../../../autos-backend/src/enums/URLs";
import { notifyError } from "./toastHelper";

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

export const handleSubmitPostBrand = async (value: any , url: string, setListValues: Dispatch<SetStateAction<any[]>>, setInsertId: Dispatch<SetStateAction<number | null>>) => {

    // valid brand
    try {
     const response = await axios.post(`${URLs.ORIGIN_SERVER}${url}`, { value }, { withCredentials: true })
      toast.success(response.data.message);
      setListValues(response.data.tableValues);
      //setInsertId(response.data.insertId);

    } catch (error: any) {
      notifyError(error.response.data.errno, error.response.data.message);
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