import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Grid } from "@mui/material";
import axios from "axios";

import { SelectChangeEvent, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { MainComponentWidth, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow } from "../../../../../themes/ThemeColor";
import SelectField from "../../../../formularFields/SelectField";
import { FormDataModel, handleSubmitPostBaureihe } from "../../../../../helper/submits";
import { useEffectFetch, useEffectModel } from "../../../../../helper/DataLoading";
import { FormBaureiheSelect, FormBaureihe, AxiosDataBaureihe} from "../../../../../../../autos-backend/src/interfaces/IAxiosData";

import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_BAUREIHE, REGEX_HUBRAUM, REGEX_NAMES } from "../../../../../../../autos-backend/src/regex/regex";
import { formularBaureiheIsValid } from "../../../../../helper/validHelper";

import { notifySuccess, notifyError } from "../../../../../helper/toastHelper";

const gridWithSM = 3.65;
const gridWithXS = 5.5;



const initialFormSelect: FormBaureiheSelect = {
  brand: "",
  model: "",
  cartype: ""
}

const initalFormBaureihe: FormBaureihe = {
  baureihe: "",
  kw: "",
  hubraum: ""
}

// Components
const InsertBaureihe = () => {

  const [formSelect, setFormSelect] = useState(initialFormSelect);
  const [formBaureihe, setFormBaureihe] = useState(initalFormBaureihe);

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormSelect(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleChange = (fieldName: string, fieldValue: string | boolean) => {
    setFormBaureihe({ ...formBaureihe , [fieldName]: fieldValue })
  }

  // States
  const [listValues, setListValues] = useState<any[]>([]);
  const [listModels, setListModels] = useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const [maxDate, setMaxDate] = React.useState(dayjs());


  // Fetch Data from database
  useEffectFetch(URLs.FETCH_BAUREIHE, setListValues);


  // Fetch Model after select value changed
  useEffectModel(URLs.FETCH_BAUREIHE_MODEL, setListModels, formSelect.brand);

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();
    

    if (formularBaureiheIsValid(formBaureihe, formSelect)) {

      const numberFrom: number | undefined = selectedDateFrom?.year();
      const numberTo: number | undefined = selectedDateTo?.year();

      const axiosData: AxiosDataBaureihe = { 
        formBaureiheSelect: formSelect,
        formBaureihe: formBaureihe,
        from: numberFrom,
        to: numberTo
      }
      // valid brand
      
      try {
        const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_WRITE_BAUREIHE}`, axiosData , { withCredentials: true });
        notifySuccess(response.data.message);
      } catch (error) {
        notifyError("Fehler");
      } 
    } else {
      notifyError("Bitte beachten Sie alle Eingaben");
    }
  }

  const YearFromComponent: React.FC = () => {
    return <Grid item xs={gridWithXS} md={gridWithSM}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={'Baujahr von'} value={selectedDateFrom} views={['year']} minDate={minDateConst} maxDate={maxDateConst} onChange={(newDate) => { setSelectedDateFrom(newDate), setSelectedDateTo(newDate) }} />

      </LocalizationProvider>
    </Grid>
  }

  const YearToComponent = () => {
    return <Grid item xs={gridWithXS} md={gridWithSM}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={'Baujahr bis'} value={selectedDateTo} views={['year']} minDate={selectedDateFrom} maxDate={maxDate} onChange={(newDate) => { setSelectedDateTo(dayjs(newDate)) }} />
      </LocalizationProvider>
    </Grid>
  }


  return <>
    <Toaster />
    <MainComponentWidth>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={listValues[0]} objectName="brand" idOfSelect="brandid" selectedValue={formSelect.brand} handleChange={handleChangeSelect} label="Marke" />
        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <SelectField  values={listModels} objectName="model" idOfSelect="modelid" selectedValue={formSelect.model} handleChange={handleChangeSelect} label="Modell" />
            
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <TextFieldCars id="baureihe" label="Baureihe" onChange={value => handleChange("baureihe", value)} regex={REGEX_BAUREIHE} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

            <SelectField values={listValues[1]} objectName="cartype" idOfSelect="cartypeid" selectedValue={formSelect.cartype} handleChange={handleChangeSelect} label="Typ" />

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <TextFieldCars id="kw" label="Leistung" onChange={value => handleChange("kw", value)} regex={REGEX_HUBRAUM} />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <TextFieldCars id="hubraum" label="Hubraum ccm³" onChange={value => handleChange("hubraum", value)} regex={REGEX_HUBRAUM} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <YearFromComponent />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <YearToComponent />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

    </MainComponentWidth>
  </>
};

export default InsertBaureihe;