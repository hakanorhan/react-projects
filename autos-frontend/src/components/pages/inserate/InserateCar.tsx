import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormGroup, Paper, SelectChangeEvent, Step, StepLabel, Stepper, Typography } from '@mui/material';
import axios from 'axios';
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import { REGEX_HUBRAUM, REGEX_NAMES } from '../../../../../autos-backend/src/regex/regex';
import { DivFormularAdmin, DivSearchInserate, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow } from '../../../themes/ThemeColor';
import { AxiosDataInserate, InserateCheckbox, InserateData, InserateSelect } from '../../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../../autos-backend/src/enums/URLs';
import { notifySuccess, notifyError } from '../../../helper/toastHelper';
import TextFieldCars from '../../formularFields/TextFieldCars';
import TextFieldArea from '../../formularFields/TextArea';
import { Box } from '@mui/material';
import SelectField from '../../formularFields/SelectField';
import UploadImage from './UploadImage';
import { useEffectFetch, useEffectModel } from '../../../helper/DataLoading';
import { primaryColorMain } from '../../../themes/ThemeColor';
import DateComponentMonthYear from '../../formularFields/DateComponentMonthYear';

const steps = ['Fahrzeugdaten', 'Bilder'];

export default function InserateCar() {

  const initialSelect: InserateSelect = {
    brand: "",
    model: "",
    cartype: "",
    fuelname: "",
    transmissionname: "",
    doors: ""
  }

  const initalInserate: InserateData = {
    km: 0,
    ps: 0,
    description: "",
    previousOwner: 0,
    year: -1,
    month: -1,
    price: 0,
    hubraum: 0
  }

  const initialCheckbox: InserateCheckbox = {
    huNew: false,
    auNew: false,
    unfallFahrzeug: false
  }

  const [form, setForm] = useState<InserateData>(initalInserate);
  const [formSelect, setFormSelect] = useState<InserateSelect>(initialSelect);
  const [formCheckbox, setFormCheckbox] = useState<InserateCheckbox>(initialCheckbox);

  const [submitClicked, setSubmitClicked] = useState(false);

  // States
  const [listBrands, setListBrands] = useState<any[]>([]);
  const [listModels, setListModels] = useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = useState<string[]>([]);
  const [listTransmission, setListTransmission] = useState<string[]>([]);
  const [listFuels, setListFuels] = useState<string[]>([]);
  const [listDoors, setListDoors] = useState<string[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [disabledNextStep, setDisabledNextStep] = useState<boolean>(false);
  const [disabledPreviousStep, setDisabledPreviousSep] = useState<boolean>(true);

  const [year, setYear] = useState(-1);
  const [month, setMonth] = useState(-1);

  useEffect(() => {
    axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_INSERATE_DATA}`, { withCredentials: true })
      .then(response => {
        const tableValues = response.data.tableValues;
        setListBrands(tableValues.resultBrands);
        setListCarTypes(tableValues.resultCarTypes);
        setListTransmission(tableValues.resultTransmissions);
        setListFuels(tableValues.resultFuels);
        setListDoors(tableValues.resultDoors);
      })
  }, [])

  // Fetch Model after select value changed
  useEffectModel(URLs.FETCH_BAUREIHE_MODEL, setListModels, formSelect.brand);

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormSelect(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleOnChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target; // Name und checked-Wert der Checkbox
    setFormCheckbox(prevState => ({
      ...prevState,
      [id]: checked // Aktualisiere den Zustand mit dem neuen Wert
    }));
  }

  const handleSubmit = async (event: FormEvent) => {

    form.year = year;
    form.month = month;

    event.preventDefault();

    {// TODO: Add validation 
    }
    if (true) {
      const axiosData: AxiosDataInserate = {
        inserateData: form,
        inserateSelect: formSelect,
        inserateCheckbox: formCheckbox
      }
      // valid brand
      try {
        const response = await axios.post(`${URLs.ORIGIN_SERVER}${URLs.POST_INSERATE_CAR}`, axiosData, { withCredentials: true });
        notifySuccess(response.data.message);
        notifySuccess("Erfolgreich hinzugefügt");
        setActiveStep(0);
        // Image upload on submit
        setSubmitClicked(true);

      } catch (error) {
        notifyError("Fehler");
      }
    } else {
      notifyError("Bitte beachten Sie alle Eingaben");
    }
  }

  const handleNextStep = () => {
    if (activeStep === 0) { setDisabledPreviousSep(false); setActiveStep(activeStep + 1); }
    // If active step is the length of steps.
    // change next step value to inserieren

  }

  const handlePreviousStep = () => {
    if (activeStep === 1) { setDisabledPreviousSep(true); setActiveStep(activeStep -1); }
  }

  const PersonalInfoComponent = () => {
    return <>
      <FormGroup>
        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow sx={{ textAlign: 'center' }}>
            <FormControlLabel control={<Checkbox defaultChecked disabled />} label="Interessentierte können mich gerne über den Chat kontaktieren." />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow sx={{ textAlign: 'center' }}>
            <FormControlLabel control={<Checkbox />} label="Interessentierte können mich gerne unter der angegebenen Nummer anrufen" />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

            <FormControlLabel control={<Checkbox />} label="Interessentierte dürfen mich gerne per Email-kontaktieren" />


      </FormGroup>
    </>
  }

  return (<>
    <DivSearchInserate>
      <Stepper activeStep={activeStep} sx={{ marginBottom: '1rem' }}>
        {
          steps.map((step, index) => (
            <Step key={index}>
              <StepLabel> {step} </StepLabel>
            </Step>
          ))
        }
      </Stepper>
      <form onSubmit={handleSubmit} noValidate>

        <Box sx={{  display: activeStep == 0 ? 'block' : 'none' }}>
        <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <SelectField values={listBrands} objectName='brand' idOfSelect='brandid' selectedValue={formSelect.brand} handleChange={handleChangeSelect} label='Marke' />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <SelectField values={listModels} objectName='model' idOfSelect='modelid' selectedValue={formSelect.model} handleChange={handleChangeSelect} label='Modell' />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <TextFieldCars id='previousOwner' onChange={value => handleOnChange('previousOwner', value)} label='Anzahl Vorbesitzer' regex={REGEX_HUBRAUM} />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <DateComponentMonthYear setYear={setYear} setMonth={setMonth} />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <SelectField values={listCarTypes} objectName='cartype' idOfSelect='cartypeid' selectedValue={formSelect.cartype} handleChange={handleChangeSelect} label='Typ' />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <SelectField values={listTransmission} objectName='transmissionname' idOfSelect='transmissionid' selectedValue={formSelect.transmissionname} handleChange={handleChangeSelect} label='Getriebe' />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <TextFieldCars id='km' label='Kilometerstand' onChange={value => handleOnChange('km', value)} regex={REGEX_HUBRAUM} />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <TextFieldCars id='ps' label='Leistung in PS' onChange={value => handleOnChange('ps', value)} regex={REGEX_HUBRAUM} />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <SelectField values={listFuels} objectName='fuelname' idOfSelect='fuelid' selectedValue={formSelect.fuelname} handleChange={handleChangeSelect} label='Kraftstoff' />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <SelectField values={listDoors} objectName='doors' idOfSelect='doorid' selectedValue={ formSelect.doors } handleChange={handleChangeSelect} label='Anzahl Türen' />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <DivTwoFieldsWithSpaceBetween>
        <DivWidthTwoFieldsRow>
          <TextFieldCars id='hubraum' label='Hubraum in ccm³' onChange={value => handleOnChange('hubraum', value)} regex={REGEX_HUBRAUM} />
        </DivWidthTwoFieldsRow>
        <DivWidthTwoFieldsRow>
          <TextFieldCars id='price' onChange={value => handleOnChange('price', value)} label='Preis' regex={REGEX_HUBRAUM} />
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id='auNew' onChange={handleOnChangeCheckbox} />} label="Abgasuntersuchung neu" />
      <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id='huNew' onChange={handleOnChangeCheckbox} />} label="Hauptuntersuchung neu" />
      <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id='unfallFahrzeug' onChange={handleOnChangeCheckbox} />} label="Unfallfahrzeug" />

      <TextFieldArea id='beschreibung' label='Beschreibung' onChange={value => handleOnChange('beschreibung', value)}
        placeholder='Fügen Sie bitte eine Beschreibung hinzu' minRows={8} maxRows={10} />
        </Box>

        <Box sx={{ display: activeStep == 0 ? 'none' : 'block' }}>
          <UploadImage submitClicked={ submitClicked } />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button disabled={disabledPreviousStep} onClick={handlePreviousStep} sx={{ marginRight: '1rem' }}>Zurück</Button>
          <Button sx={{ display: activeStep === 1 ? 'none' : 'block' }} disabled={disabledNextStep} onClick={handleNextStep}>Weiter</Button>
          <Button sx={{ display: activeStep === 1 ? 'block' : 'none' }}  type='submit' variant='contained'>Inserieren</Button> 
        </Box>
      </form>
    </DivSearchInserate>
  </>
  )
}
