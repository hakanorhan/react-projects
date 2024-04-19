import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormGroup, Grid, SelectChangeEvent, Step, StepLabel, Stepper, Typography } from '@mui/material';
import axios from 'axios';
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import { REGEX_HUBRAUM, REGEX_PRICE } from '../../../../../autos-backend/src/regex/regex';
import { DivSearchInserate, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow, HeaderInserateH1, HeaderIcon } from '../../../themes/ThemeColor';
import { AxiosDataInserate, AxiosInserateResponse, InserateCheckbox, InserateData, InserateSelect } from '../../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../../autos-backend/src/enums/URLs';
import { notifySuccess, notifyError } from '../../../helper/toastHelper';
import TextFieldCars from '../../formularFields/TextFieldCars';
import TextFieldArea from '../../formularFields/TextFieldArea';
import { Box } from '@mui/material';
import SelectField from '../../formularFields/SelectField';
import UploadImage from './UploadImage';
import { useEffectModel } from '../../../helper/DataLoading';
import { primaryColorMain } from '../../../themes/ThemeColor';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Zoom from '@mui/material/Zoom';
import dayjs from 'dayjs';
import { DateComponentMonthYear } from '../../formularFields/DateComponentMonthYear';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SelectFieldEnums } from '../../../../../autos-backend/src/enums/SelectFieldEnums';


const steps = ['Fahrzeugdaten', 'Bilder', 'Abgeschlossen'];

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
    unfallFahrzeug: false,
    scheckheft: false,
    fittodrive: true,
    abstandstempomat: false,
    ambientbeleuchtung: false,
    headupdisplay: false,
    totwinkelassistent: false
  }

  const [form, setForm] = useState<InserateData>(initalInserate);
  const [formSelect, setFormSelect] = useState<InserateSelect>(initialSelect);
  const [formCheckbox, setFormCheckbox] = useState<InserateCheckbox>(initialCheckbox);

  const [submitClicked, setSubmitClicked] = useState(false);

  const [loading, setLoading] = useState(false);

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

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [klimaValue, setKlimaValue] = useState("1");

  const [carId, setCarId] = useState<number>(-1);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>, value: string,
  ) => {
    setKlimaValue(value);
  };

  const setAllFormsToInitial = () => {
    setActiveStep(0);
    setForm(initalInserate); setFormSelect(initialSelect); setFormCheckbox(initialCheckbox);
    setListBrands([]); setListModels([]); setListCarTypes([]); setListTransmission([]); setListFuels([]); setListDoors([]);
    setDisabledNextStep(false); setDisabledPreviousSep(true);

    setYear(dayjs().year()); setMonth(dayjs().month() + 1); setRequestSuccess(false);
  }

  useEffect(() => {
    setRefresh(false)
    axios.get(`${URLs.ORIGIN_SERVER}${URLs.FETCH_STATIC_DATA}`, { withCredentials: true })
      .then(response => {
        const tableValues = response.data.tableValues;
        setListBrands(tableValues.resultBrands);
        setListCarTypes(tableValues.resultCarTypes);
        setListTransmission(tableValues.resultTransmissions);
        setListFuels(tableValues.resultFuels);
        setListDoors(tableValues.resultDoors);
      })
  }, [refresh])

  // Fetch Model after select value changed
  useEffectModel(URLs.FETCH_MODEL, setListModels, formSelect.brand);

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
      setLoading(true);
      const axiosData: AxiosDataInserate = {
        inserateData: form,
        inserateSelect: formSelect,
        inserateCheckbox: formCheckbox,
        klima: klimaValue
      }
      // valid brand
      try {
        const response = await axios.post<AxiosInserateResponse>(`${URLs.ORIGIN_SERVER}${URLs.POST_INSERATE_CAR}`, axiosData, { withCredentials: true });
        notifySuccess(response.data.message);
        notifySuccess("Erfolgreich hinzugefügt " + response.data.carId);
        console.log("Status: " + response.status)
        if (response.status === 200) {
          // Image upload on submit
          setRequestSuccess(true);
          setActiveStep(activeStep + 1);
          setCarId(response.data.carId);
          setSubmitClicked(true);
          setLoading(false);
        }
      } catch (error) {
        notifyError("Fehler");
      } finally {
        setLoading(false);
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
    if (activeStep === 1) { setDisabledPreviousSep(true); setActiveStep(activeStep - 1); }
  }

  // TODO: uncomment PersonalInfoComponent
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
      <Typography variant='h4' component='h1'>Fahrzeug inserieren</Typography>
      <Stepper activeStep={activeStep} sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {
          steps.map((step, index) => (
            <Step key={index}>
              <StepLabel> {step} </StepLabel>
            </Step>
          ))
        }
      </Stepper>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: requestSuccess ? 'none' : activeStep == 0 ? 'block' : 'none' }}>
          <Grid container columnSpacing={2} rowSpacing={1}>
            { /* Brand */}
            <Grid item xs={6}> <SelectField values={listBrands} objectName='brand' idOfSelect='brand_id' selectedValue={formSelect.brand} handleChange={handleChangeSelect} label='Marke' /> </Grid>
            <Grid item xs={6}> <SelectField values={listModels} objectName='model' idOfSelect='model_id' selectedValue={formSelect.model} handleChange={handleChangeSelect} label='Modell' /> </Grid>

            <Grid item xs={6}>  <SelectField values={listCarTypes} objectName='cartype' idOfSelect='cartype_id' selectedValue={formSelect.cartype} handleChange={handleChangeSelect} label='Typ' /> </Grid>
            <Grid item xs={6}> <SelectField values={listTransmission} objectName='transmission' idOfSelect='transmission_id' selectedValue={formSelect.transmissionname} handleChange={handleChangeSelect} label='Getriebe' /> </Grid>

            <Grid item xs={6}> <SelectField values={listFuels} objectName='fuel' idOfSelect='fuel_id' selectedValue={formSelect.fuelname} handleChange={handleChangeSelect} label='Kraftstoff' /> </Grid>
            <Grid item xs={6}> <SelectField values={listDoors} objectName='door' idOfSelect='door_id' selectedValue={formSelect.doors} handleChange={handleChangeSelect} label='Anzahl Türen' /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='previousOwner' onChange={value => handleOnChange('previousOwner', value)} label='Anzahl Vorbesitzer' regex={REGEX_HUBRAUM} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='km' label='Kilometerstand in KM' onChange={value => handleOnChange('km', value)} regex={REGEX_PRICE} refresh={refresh} /> </Grid>
            <Grid item xs={6}> <TextFieldCars id='ps' label='Leistung in PS' onChange={value => handleOnChange('ps', value)} regex={REGEX_HUBRAUM} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='hubraum' label='Hubraum in ccm³' onChange={value => handleOnChange('hubraum', value)} regex={REGEX_HUBRAUM} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <DateComponentMonthYear setYear={setYear} setMonth={setMonth} newInserate={refresh} /> </Grid>
            <Grid item xs={6}> <TextFieldCars id='price' onChange={value => handleOnChange('price', value)} label='Preis in €' regex={REGEX_PRICE} refresh={refresh} /></Grid>

            <Grid item xs={12}> <hr style={{ color: 'black' }} /> </Grid>

            <Grid item xs={6}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.abstandstempomat} id='abstandstempomat' onChange={handleOnChangeCheckbox} />} label="Abstandstempomat" /></Grid>
            <Grid item xs={6}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.ambientbeleuchtung} id='ambientbeleuchtung' onChange={handleOnChangeCheckbox} />} label="Ambientbeleuchtung" /></Grid>
            <Grid item xs={6}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.headupdisplay} id='headupdisplay' onChange={handleOnChangeCheckbox} />} label="Head-up Display" /></Grid>
            <Grid item xs={6}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.totwinkelassistent} id='totwinkelassistent' onChange={handleOnChangeCheckbox} />} label="Totwinkelassistent" /></Grid>
            
            <Grid item xs={12}>      <ToggleButtonGroup
              color="primary"
              value={klimaValue}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="1">Keine</ToggleButton>
              <ToggleButton value="2">Klima</ToggleButton>
              <ToggleButton value="3">Klimaautomatik</ToggleButton>
            </ToggleButtonGroup>  </Grid>

            <Grid item xs={12}><hr /></Grid>

            <Grid item xs={4}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.auNew} id='auNew' onChange={handleOnChangeCheckbox} />} label="AU neu" /></Grid>
            <Grid item xs={4}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.huNew} id='huNew' onChange={handleOnChangeCheckbox} />} label="HU neu" /> </Grid>
            <Grid item xs={4}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.unfallFahrzeug} id='unfallFahrzeug' onChange={handleOnChangeCheckbox} />} label="Unfallfahrzeug" /></Grid>
            <Grid item xs={4}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.fittodrive} id='fittodrive' onChange={handleOnChangeCheckbox} />} label="Fahrtuechtig" /></Grid>
            <Grid item xs={4}><FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={refresh ? false : formCheckbox.scheckheft} id='scheckheft' onChange={handleOnChangeCheckbox} />} label="Scheckheftgepflegt" /></Grid>


          </Grid>
          <TextFieldArea disbled={false} id='description' label='Beschreibung' onChange={value => handleOnChange('description', value)}
            placeholder='Fügen Sie bitte eine Beschreibung hinzu' minRows={8} maxRows={10} />
        </Box>

        <Box sx={{ display: requestSuccess ? 'none' : activeStep == 0 ? 'none' : 'block' }}>
          <UploadImage submitClicked={submitClicked} carId={carId} />
        </Box>

        <Box sx={{ display: requestSuccess ? 'block' : 'none' }}>
          <HeaderIcon>
            <Zoom in={requestSuccess} style={{ transform: 'scale(4)' }}>
              <CheckCircleOutlineIcon fontSize='large' sx={{ marginTop: '4.5rem', color: '#56ae57', transform: 'scale(4)' }} />
            </Zoom>
            <HeaderInserateH1 sx={{ marginTop: '6rem' }} color='#56ae57'>Das Inserat wird nach der Prüfung veröffentlicht.</HeaderInserateH1>
          </HeaderIcon>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button disabled={disabledPreviousStep} onClick={handlePreviousStep} sx={{ display: requestSuccess ? 'none' : 'display', marginRight: '1rem' }}>Zurück</Button>
          <Button sx={{ display: requestSuccess ? 'none' : activeStep === 1 ? 'none' : 'block' }} disabled={disabledNextStep} onClick={handleNextStep}>Weiter</Button>
          <Button sx={{ display: requestSuccess ? 'none' : activeStep === 1 ? 'block' : 'none' }} type='submit' variant='contained'>Inserieren</Button>
          <HeaderIcon>
            <Button onClick={() => { setAllFormsToInitial(); setRefresh(true); }} sx={{ marginRight: '1rem', marginTop: '3rem', width: '150px', display: requestSuccess ? 'display' : 'none' }}>Inserieren</Button>
            <Button sx={{ marginTop: '3rem', width: '150px', display: requestSuccess ? 'display' : 'none' }}>Suchen</Button>

          </HeaderIcon>
        </Box>
      </form>
    </DivSearchInserate>
  </>
  )
}
