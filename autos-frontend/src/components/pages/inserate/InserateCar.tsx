import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Grid, SelectChangeEvent, Step, StepLabel, Stepper, Typography } from '@mui/material';
import axios from 'axios';
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import { REGEX_HUBRAUM, REGEX_MILEAGE, REGEX_NAMES, REGEX_OWNER, REGEX_POWER, REGEX_PRICE } from '../../../regex/REGEX';
import {  HeaderIcon, COMPONENT_DISTANCE } from '../../../themes/Theme';
import { AxiosDataInserate, AxiosInserateResponse, InserateCheckbox, InserateData, InserateSelect } from '../../../interfaces/IAxiosData';
import { URLs } from '../../../enums/URLs';
import { notifyError, notifySuccess } from '../../../helper/toastHelper';
import TextFieldCars from '../../formularFields/TextFieldCars';
import TextFieldArea from '../../formularFields/TextFieldArea';
import { Box } from '@mui/material';
import SelectField from '../../formularFields/SelectField';
import { useEffectModel } from '../../../helper/DataLoading';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Zoom from '@mui/material/Zoom';
import dayjs from 'dayjs';
import { DateComponentMonthYear } from '../../formularFields/DateComponentMonthYear';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';
import DropZone from './DropZone';
import { Toaster } from 'react-hot-toast';
import * as ValidHelper from '../../../helper/validHelper.js';

const steps = ['Fahrzeugdaten', 'Bilder', 'Abgeschlossen'];

export default function InserateCar() {

  const navigate = useNavigate();

  const initialSelect: InserateSelect = {
    brand: "",
    model: "",
    cartype: "",
    fuel: "",
    transmission: "",
    door: ""
  }

  const initalInserate: InserateData = {
    km: -1,
    ps: -1,
    description: "",
    previousOwner: -1,
    year: -1,
    month: -1,
    price: -1,
    hubraum: -1,
    color: ""
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

  const [loading, setLoading] = useState(false);

  // States
  const [listBrands, setListBrands] = useState<any[]>([]);
  const [listModels, setListModels] = useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = useState<string[]>([]);
  const [listTransmission, setListTransmission] = useState<string[]>([]);
  const [listFuels, setListFuels] = useState<string[]>([]);
  const [listDoors, setListDoors] = useState<string[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [inserateSuccess, setInserateSuccess] = useState<boolean>(false);

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [refresh, setRefresh] = useState(false);

  const [klimaValue, setKlimaValue] = useState("1");

  const [carId, setCarId] = useState<number>(-1);

  const handleChange = (
    _: React.SyntheticEvent<HTMLElement>, value: string,
  ) => {
    setKlimaValue(value);
  };

  useEffect(() => {
    setRefresh(false)
    axios.get(`${URLs.ORIGIN_SERVER}${URLs.SEARCH_DATAS}`, { withCredentials: true })
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

    if (activeStep === 0) {
      setLoading(true);
      const axiosData: AxiosDataInserate = {
        inserateData: form,
        inserateSelect: formSelect,
        inserateCheckbox: formCheckbox,
        klima: klimaValue
      }
      if(!axiosData.inserateSelect.brand || axiosData.inserateSelect.brand === "") {
        notifyError("error brand", "Bitte prüfen Sie das Marke-Feld");
      } else if(!axiosData.inserateSelect.model || axiosData.inserateSelect.model === "") {
        notifyError("error model", "Bitte prüfen Sie das Modell-Feld");
      } else if(!axiosData.inserateSelect.cartype || axiosData.inserateSelect.cartype === "") {
        notifyError("error cartype", "Bitte prüfen Sie das Typ-Feld");
      } else if(!axiosData.inserateSelect.transmission || axiosData.inserateSelect.transmission === "") {
        notifyError("error transmission", "Bitte prüfen Sie das Getriebe-Feld");
      } else if(!axiosData.inserateSelect.fuel || axiosData.inserateSelect.fuel === "") {
        notifyError("error fuel", "Bitte prüfen Sie das Kraftstoff-Feld");
      } else if(!axiosData.inserateSelect.door || axiosData.inserateSelect.door === "") {
        notifyError("error door", "Bitte prüfen Sie das Türen-Feld");
      } else if( !ValidHelper.formularOwnerIsValid(axiosData.inserateData.previousOwner)) {
        notifyError("error owner", "Bitte prüfen Sie das Vorbersitzer:in-Feld");
      } else if(!ValidHelper.formularMileageIsValid(axiosData.inserateData.km)) {
        notifyError("error mileage", "Bitte prüfen Sie das Kilometerstand-Feld");
      } else if(!ValidHelper.formularPowerIsValid(axiosData.inserateData.ps)) {
        notifyError("error power", "Bitte prüfen Sie das Leistung-Feld");
      } else if(!ValidHelper.formularHubraumIsValid(axiosData.inserateData.hubraum)) {
        notifyError("error hubraum", "Bitte prüfen Sie das Hubraum-Feld");
      } else if(!ValidHelper.formularPriceIsValid(axiosData.inserateData.price)) {
        notifyError("error price", "Bitte prüfen Sie das Preis-Feld");
      } else if(!ValidHelper.formularNameValid(axiosData.inserateData.color)) {
        notifyError("error color", "Bitte prüfen Sie das Farbe-Feld");
      }
      else {
      try {
        const response = await axios.post<AxiosInserateResponse>(URLs.ORIGIN_SERVER + URLs.POST_INSERATE_CAR, axiosData, { withCredentials: true });

        if (response.status === 200) {
          setCarId(response.data.carId);
          setLoading(false);
          notifySuccess("success", response.data.message);
          setActiveStep(activeStep + 1);
        }
      } catch (error: any) {
        notifyError("1", error.response.data.message);
      } finally {
        setLoading(false);
      }}
    } else {
      notifyError("2", "Bitte beachten Sie alle Eingaben");
    }
  }
/*
  const handleNextStep = () => {
    
    if (activeStep === 0) { 
      setActiveStep(activeStep + 1);
     }
  }*/

  const handleLastStep = () => {
    async function finishInserate() {
      const finish = 0;
      const inserateid = carId;
      try {
        await axios.post(URLs.ORIGIN_SERVER + URLs.POST_INSERATE_FINISH, { finish, inserateid }, { withCredentials: true });
        const step = activeStep + 2;
        setActiveStep(step);
        setInserateSuccess(true);
      } catch (error: any) {
        const message = error.response.data.message;
        notifyError(message, message)
      }
    }

    finishInserate();
  }

  return (<>
  <Toaster />
    <Box sx={{ display: 'flex',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    margin: 'auto',
    flexDirection: 'column',
   width: { xs: '95%', md:'750px' } }}>
    
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
        <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
          <Grid container columnSpacing={2} rowSpacing={1}>
            { /* Brand */}
            <Grid item xs={12}> <SelectField values={listBrands} objectName='brand' idOfSelect='brand_id' selectedValue={formSelect.brand} handleChange={handleChangeSelect} label='Marke' /> </Grid>

            <Grid item xs={6}> <SelectField values={listModels} objectName='model' idOfSelect='model_id' selectedValue={formSelect.model} handleChange={handleChangeSelect} label='Modell' /> </Grid>

            <Grid item xs={6}>  <SelectField values={listCarTypes} objectName='cartype' idOfSelect='cartype_id' selectedValue={formSelect.cartype} handleChange={handleChangeSelect} label='Typ' /> </Grid>
            <Grid item xs={6}> <SelectField values={listTransmission} objectName='transmission' idOfSelect='transmission_id' selectedValue={formSelect.transmission} handleChange={handleChangeSelect} label='Getriebe' /> </Grid>

            <Grid item xs={6}> <SelectField values={listFuels} objectName='fuel' idOfSelect='fuel_id' selectedValue={formSelect.fuel} handleChange={handleChangeSelect} label='Kraftstoff' /> </Grid>
            <Grid item xs={6}> <SelectField values={listDoors} objectName='door' idOfSelect='door_id' selectedValue={formSelect.door} handleChange={handleChangeSelect} label='Anzahl Türen' /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='previousOwner' onChange={value => handleOnChange('previousOwner', value)} label='Anzahl Vorbesitzer:in' regex={REGEX_OWNER} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='km' label='Kilometerstand in KM' onChange={value => handleOnChange('km', value)} regex={REGEX_MILEAGE} refresh={refresh} /> </Grid>
            <Grid item xs={6}> <TextFieldCars id='ps' label='Leistung in PS' onChange={value => handleOnChange('ps', value)} regex={REGEX_POWER} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <TextFieldCars id='hubraum' label='Hubraum in ccm³' onChange={value => handleOnChange('hubraum', value)} regex={REGEX_HUBRAUM} refresh={refresh} /> </Grid>

            <Grid item xs={6}> <DateComponentMonthYear setYear={setYear} setMonth={setMonth} newInserate={refresh} /> </Grid>
            <Grid item xs={6}> <TextFieldCars id='price' onChange={value => handleOnChange('price', value)} label='Preis in €' regex={REGEX_PRICE} refresh={refresh} /></Grid>
            <Grid item xs={6}> <TextFieldCars id='color' onChange={value => handleOnChange('color', value)} label='Farbe' regex={REGEX_NAMES} refresh={refresh} /> </Grid>

            <Grid item xs={12}> <hr /> </Grid>

            <Grid item xs={6}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.abstandstempomat} id='abstandstempomat' onChange={handleOnChangeCheckbox} />} label="Abstandstempomat" /></Grid>
            <Grid item xs={6}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.ambientbeleuchtung} id='ambientbeleuchtung' onChange={handleOnChangeCheckbox} />} label="Ambientbeleuchtung" /></Grid>
            <Grid item xs={6}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.headupdisplay} id='headupdisplay' onChange={handleOnChangeCheckbox} />} label="Head-up Display" /></Grid>
            <Grid item xs={6}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.totwinkelassistent} id='totwinkelassistent' onChange={handleOnChangeCheckbox} />} label="Totwinkelassistent" /></Grid>

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

            <Grid item xs={4}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.auNew} id='auNew' onChange={handleOnChangeCheckbox} />} label="AU neu" /></Grid>
            <Grid item xs={4}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.huNew} id='huNew' onChange={handleOnChangeCheckbox} />} label="HU neu" /> </Grid>
            <Grid item xs={4}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.unfallFahrzeug} id='unfallFahrzeug' onChange={handleOnChangeCheckbox} />} label="Unfallfahrzeug" /></Grid>
            <Grid item xs={4}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.fittodrive} id='fittodrive' onChange={handleOnChangeCheckbox} />} label="Fahrtuechtig" /></Grid>
            <Grid item xs={4}><FormControlLabel control={<Checkbox checked={refresh ? false : formCheckbox.scheckheft} id='scheckheft' onChange={handleOnChangeCheckbox} />} label="Scheckheftgepflegt" /></Grid>


          </Grid>
          <TextFieldArea disbled={false} id='description' label='Beschreibung' onChange={value => handleOnChange('description', value)}
            placeholder='Fügen Sie bitte eine Beschreibung hinzu' minRows={8} maxRows={10} />
        </Box>

        <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>

          {activeStep === 1 && !loading
            ?
            <DropZone carId={carId} />
            : <></>
          }
        </Box>

        <Box sx={{ display: activeStep === 3 ? 'block' : 'none' }}>
          <HeaderIcon>
            <Zoom in={true} style={{ transform: 'scale(1.5)' }}>
              <CheckCircleOutlineIcon fontSize='large' sx={{ color: 'primary.main', marginTop: '3rem', transform: 'scale(1.5)' }} />
            </Zoom>
          </HeaderIcon>
          <Typography variant='h5' component='h3' sx={{ textAlign: 'center', marginTop: '7rem', marginBottom: '3rem' }} >Das Inserat wird nach der Prüfung veröffentlicht.</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', margin: 'auto' }}>

          {/* save form */}
          <Button variant='contained' sx={{ display: activeStep === 0 ? 'block' : 'none' }} disabled={false} type='submit' id='inserateForm'>Weiter</Button>

          {/* upload Image */}
          <Button onClick={handleLastStep} sx={{ display: activeStep === 1 ? 'block' : 'none' }} variant='contained'>Abschliessen</Button>


          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth onClick={() => { navigate(0); }} sx={{ width: '200px', marginTop: '3rem', display: inserateSuccess ? 'display' : 'none' }}>Inserieren</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' fullWidth onClick={() => { navigate(URLs.HOME_ALL_SEARCH_COUNT) }} sx={{ width: '200px', marginTop: COMPONENT_DISTANCE, display: inserateSuccess ? 'display' : 'none' }}>Suchen</Button>
            </Grid>
          </Grid>

        </Box>
      </form>

    </Box>
  </>
  )
}
