import React, { FormEvent, useState } from 'react';
import { SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Button } from '@mui/material';
import { REGEX_EMAIL, REGEX_HUBRAUM } from '../../../../autos-backend/src/regex/regex';
import { DivFormularAdmin, DivSearchInserate, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow } from '../../themes/ThemeColor';
import { AxiosDataInserate, InserateData, InserateSelect } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import { notifySuccess, notifyError } from '../../helper/toastHelper';
import TextFieldCars from '../formularFields/TextFieldCars';
import TextFieldArea from '../formularFields/TextArea';
import { Box } from '@mui/material';
import SelectField from '../formularFields/SelectField';
import UploadImage from './UploadImage';
export default function InserateCar() {

  const initialSelect: InserateSelect = {
    brand: "",
    model: "",
    baureihe: "",
    cartype: "",
    fuel: "",
    transmission: ""
  }

  const initalInserate: InserateData = {
    kilometerstand: "",
    kw: "",
    beschreibung: ""
  }

  const [form, setForm] = useState<InserateData>(initalInserate);
  const [formSelect, setFormSelect] = useState<InserateSelect>(initialSelect);
  const [toggleValue, setToggleValue] = useState<string>("");

  const [submitClicked, setSubmitClicked] = useState(false);

  // States
  const [listValues, setListValues] = useState<any[]>([]);
  const [listModels, setListModels] = useState<string[]>([]);

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormSelect(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleChangeToggle = (event: React.MouseEvent<HTMLElement>, value: string,) => {
    setToggleValue(value);
  };

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();
    console.log(form + " Toggle value: " + toggleValue)

    {// TODO: Add validation 
    }
    if (true) {
      const axiosData: AxiosDataInserate = {
        inserateData: form,
        inserateSelect: formSelect
      }
      // valid brand
      try {
        
        //const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_INSERATE_CAR}`, axiosData, { withCredentials: true });
        //notifySuccess(response.data.message);
        
        // Image upload on submit
        setSubmitClicked(true);

      } catch (error) {
        notifyError("Fehler");
      } 
    } else {
      notifyError("Bitte beachten Sie alle Eingaben");
    } 
    
  }

  return (<>
    <DivSearchInserate>
      <Typography textAlign='center' component={'h2'} variant='h2'>Fahrzeug inserieren</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
          <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Marke' />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
          <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Modell' />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Typ' />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Getriebe' />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <TextFieldCars id='kilometerstand' label='Kilometerstand' onChange={value => handleOnChange('kilometerstand', value)} regex={REGEX_HUBRAUM} />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <TextFieldCars id='kw' label='Leistung in KW' onChange={value => handleOnChange('kw', value)} regex={REGEX_HUBRAUM} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Kraftstoff' />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <SelectField values={[]} objectName='' idOfSelect='' selectedValue='' handleChange={handleChangeSelect} label='Anzahl Türen' />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>
        <Box sx={{ height: '100%', marginBottom: '1rem'}}>
          <UploadImage submitClicked={ submitClicked }/>
        </Box>

        <TextFieldArea id='beschreibung' label='Beschreibung' onChange={value => handleOnChange('beschreibung', value)} placeholder='Fügen Sie bitte eine Beschreibung hinzu' minRows={8} maxRows={10} />
        <Button fullWidth type='submit' variant='contained'>Inserieren</Button>
      </form>
    </DivSearchInserate>
  </>
  )
}
