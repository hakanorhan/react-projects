import { useState, useEffect } from "react";
import axios from "axios";
import { SelectChangeEvent, Button } from '@mui/material';
import { notifySuccess, notifyError } from "../../../../../helper/toastHelper";
/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { MainComponentWidth } from "../../../../../themes/ThemeColor";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import SelectField from "../../../../formularFields/SelectField";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_BAUREIHE } from "../../../../../../../autos-backend/src/regex/regex";
import { AxiosDataModel } from "../../../../../../../autos-backend/src/interfaces/IAxiosData";

// Components
const InsertModel = () => {

  const [form, setForm] = useState({
    model: ""
  });

  const handleChange = (fieldName: string, fieldValue: string) => {
    setForm({...form, [fieldName] : fieldValue})
  }

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [listValues, setListValues] = useState<any[]>([]);
  
  useEffect(() => {
// valid brand
const fetchData = async() => {   
  await axios.get(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_BRAND, { withCredentials: true })
        
  .then(response => { 
          //toast.success(response.data.message);
        setListValues(response.data.tableValues);
         })
         .catch(error => console.log(error))
}
fetchData();
}, [])

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const axiosDataModel: AxiosDataModel = {
      brandid: selectedBrand,
      model: form.model
    }

    try {
      const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_INSERT_MODEL}`, axiosDataModel, { withCredentials: true })
      notifySuccess(response.data.message);
      //setListValues(response.data.tableValues);
      //setInsertId(response.data.insertId);

    } catch (error) {
      notifyError("Bitte versuchen Sie erneut");
    }
  }
  
  return <><Toaster />
    <MainComponentWidth>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={listValues} objectName="brand" idOfSelect="brandid" selectedValue={selectedBrand} handleChange={handleChangeBrand} label="Marke"/>
        <TextFieldCars id="model" label="Modell" onChange={value => handleChange('model', value)} regex={REGEX_BAUREIHE} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

    </MainComponentWidth>
  </>
};

export default InsertModel;

/*
    const [selectedBrand, setSelectedBrand] = useState("");

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };
  */