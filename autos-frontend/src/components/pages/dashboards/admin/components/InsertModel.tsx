import { useState, useEffect } from "react";
import axios from "axios";
import { SelectChangeEvent, Button, Typography } from '@mui/material';
import { notifySuccess, notifyError } from "../../../../../helper/toastHelper";
/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { MainComponentWidth, mainComponentHeight } from "../../../../../themes/ThemeColor";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import SelectField from "../../../../formularFields/SelectField";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_MODEL } from "../../../../../../../autos-backend/src/regex/regex";
import { AxiosDataModel } from "../../../../../../../autos-backend/src/interfaces/IAxiosData";
import TableNormal from "../../../../tables/TableNormal";
import { formularModelIsValid } from "../../../../../helper/validHelper";

interface IFormModel {
  model: string
}

const initialModel: IFormModel = { model: "" };

// Components
const InsertModel = () => {

  const [form, setForm] = useState(initialModel);
  const [refresh, setRefresh] = useState(false);

  const handleChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [listValues, setListValues] = useState<any[]>([]);

  // brandName after insert m. showing in table
  const [brandName, setBrandName] = useState("");
  const [modelValues, setModelValues] = useState<any[]>([]);

  useEffect(() => {
    // valid brand
    const fetchData = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_BRAND, { withCredentials: true })

        .then(response => {
          //toast.success(response.data.message);
          setListValues(response.data.tableValues);
        })
        .catch(error => console.log(error))
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(modelValues.length > 0) {
      setForm(initialModel);
    }
  }, [modelValues])

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRefresh(false);
    const axiosDataModel: AxiosDataModel = {
      brandid: selectedBrand,
      model: form.model
    }

    if (!formularModelIsValid(axiosDataModel.model)) {
      notifyError("model", "Bitte korrigieren Sie das Modell.")
    } else {

      try {
        const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_INSERT_MODEL}`, axiosDataModel, { withCredentials: true })
        notifySuccess("success model", response.data.message);
        setRefresh(true);
        setModelValues(response.data.tableValues);
        setBrandName(response.data.brand);

      } catch (error: any) {
        notifyError(error.response.data.errno, error.response.data.message);
      }
    }
  }

  return <><Toaster />
    <MainComponentWidth sx={{ height: modelValues.length > 0 ? 'auto' : mainComponentHeight }}>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={listValues} objectName="brand" idOfSelect="brand_id" selectedValue={selectedBrand} handleChange={handleChangeBrand} label="Marke" />
        <TextFieldCars id="model" label="Modell" onChange={value => handleChange('model', value)} regex={REGEX_MODEL} refresh={refresh} />
        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
        {
          modelValues.length > 0 ? <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Modelle zu " + brandName} </Typography> : ""
        }
        <TableNormal listValues={modelValues} insertId={null} />
      </form>

    </MainComponentWidth>
  </>
};

export default InsertModel;