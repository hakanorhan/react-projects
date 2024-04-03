import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import 'dayjs/locale/de';
import { Link, useNavigate } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Checkbox, FormControlLabel, Box, Typography, Stepper, StepLabel, Step, Grid, Paper, SelectChangeEvent } from '@mui/material';
import { MainComponentWidth, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs';

import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

import * as EnumCheck from '../../../../../autos-backend/src/enums/CheckBoxID.js';
import * as EnumTextField from '../../../../../autos-backend/src/enums/TextFieldID.js';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { AxiosDataSignup, SignUpForm } from '../../../../../autos-backend/src/interfaces/IAxiosData.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL, REGEX_NAMES, REGEX_NUMBER, REGEX_PASSWORD } from '../../../../../autos-backend/src/regex/regex.js';
import PasswordSignUp from '../../formularFields/PasswordSignUp.js';
import PasswordConfirm from '../../formularFields/PasswordConfirm.js';

import { notifyError, notifySuccess } from '../../../helper/toastHelper.js';
import SelectField from '../../formularFields/SelectField.js';
import { MuiTelInput } from 'mui-tel-input'
import TextFieldArea from '../../formularFields/TextFieldArea.js';
import { useEffectFetch } from '../../../helper/DataLoading.js';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';

const steps = ['Konto', 'Details', 'Adresse', 'Kontakt'];

const SignUpUser: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const signUpForm: SignUpForm = {
    name: "",
    familyname: "",
    email: "",
    password1: "",
    password2: "",
    impressumdaten: null,
    street: "",
    zipcode: -1,
    nr: "",
    city: "",
    companyname: null
  }

  const [bundesland, setBundesland] = useState<any[]>([]);
  const [selectedBundesland, setSelectedBundesland] = useState<string>("");

  const maxDate = dayjs().subtract(18, 'year').toDate();
  const [dateValue, setDateValue] = useState(dayjs());
  const [telefonNr, setTelefonNr] = useState("");

  useEffectFetch(URLs.FETCH_BUNDESLAENDER, setBundesland);


  const [form, setForm] = useState<SignUpForm>(
    signUpForm
  )

  const handleOnChange = (fieldName: string, fieldValue: string | boolean) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNewImage('signin'));
  }, [dispatch])

  const navigate = useNavigate();


  // Checkbox
  const [isCheckedDealer, setIsCheckedDealer] = useState(false);
  const [isCheckedTelefon, setIsCheckedTelefon] = useState(false);
  const [isCheckedchat, setIsCheckedChat] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert(event.target.id);
    switch (event.target.id) {
      case EnumCheck.CheckBoxID.IS_CHECKED_CHAT:
        setIsCheckedChat(event.target.checked);
        break;
      case EnumCheck.CheckBoxID.IS_CHECKED_DEALER:
        setIsCheckedDealer(event.target.checked);
        break;
      case EnumCheck.CheckBoxID.IS_CHECKED_EMAIL:
        setIsCheckedEmail(event.target.checked);
        break;
      case EnumCheck.CheckBoxID.IS_CHECKED_TELEFON:
        setIsCheckedTelefon(event.target.checked);
        break;
        default:
      }
  }

  const handleChangeBundesland = (event: SelectChangeEvent) => {
    const bundeslandId = event.target.value as string;
    setSelectedBundesland(bundeslandId);
  };

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();

    // TODO: change if statemnt
    // all Formular field are valid
    if (true) {
      const formattedDate = dateValue.format('YYYY-MM-DD');

      const axiosData: AxiosDataSignup = { form, selectedBundesland, isCheckedchat, isCheckedDealer, isCheckedEmail, isCheckedTelefon, formattedDate, telefonNr }

      await axios.post('http://localhost:3001/signup',
        axiosData, {withCredentials: true})
        .then(function (response) {
          notifySuccess("response.data.message")
          navigate('/signin', { state: { successMessage: response.data.message } })

        }).catch(function (err) {
          notifyError(err.response.data.message)
        })
    } else {
      notifyError("Please check your inputs");
    }
  }

  const SubmitComponent = () => {
    return <>
      <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Registrieren</Button>
      <div style={{ display: 'flex', paddingBottom: '4rem' }}>
        <div style={{ width: '40%', color: primaryColorMain }}><p>Passwort vergessen</p></div>
        <div style={{ display: 'flex', width: '60%', justifyContent: 'end' }}><Link to="/signin" style={{ textDecoration: 'none', color: primaryColorMain }}>Bereits registriert? Login</Link></div>
      </div>
    </>
  }

  const ForwardComponent = () => {
    return <Button fullWidth onClick={() => { setActiveStep(activeStep + 1) }} type='button' variant="contained" sx={{ marginBottom: '1rem' }}>Weiter</Button>
  }
  
  return (<>
    < Toaster />
    <MainComponentWidth>
      <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
      <Typography variant='h4' component='h1'>Registrieren</Typography>

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

        {
          activeStep === 0
            ? <> {/* -------------------- Konto -------------------- */}
              {/* Email */}
              <Box>
                <TextFieldCars id={EnumTextField.TextFieldID.EMAIL} label='Email' onChange={value => handleOnChange(EnumTextField.TextFieldID.EMAIL, value,)} regex={REGEX_EMAIL} />
              </Box>
              <Box sx={{ marginBottom: '1rem' }}>
                <PasswordSignUp id={EnumTextField.TextFieldID.PASSWORD1} label='Password' onChange={value => handleOnChange(EnumTextField.TextFieldID.PASSWORD1, value)} regex={REGEX_PASSWORD} />
              </Box>
              <PasswordConfirm id={EnumTextField.TextFieldID.PASSWORD2} label='Confirm Password' onChange={value => handleOnChange(EnumTextField.TextFieldID.PASSWORD2, value)} password1={form.password1} regex={REGEX_PASSWORD} />


              {/* Cardealer */}
              <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_DEALER} checked={isCheckedDealer} onChange={handleOnChangeCheckbox} />} label="Sind Sie ein:e Händler:in ?" />

            </> : (activeStep === 1)
              ? <> {/* -------------------- Details -------------------- */}
                {/* Autohaus Companyname, not cardealer*/}
                {  isCheckedDealer &&
                <TextFieldCars id={EnumTextField.TextFieldID.COMPANYNAME} label='Autohaus' onChange={value => handleOnChange(EnumTextField.TextFieldID.COMPANYNAME, value)} regex={REGEX_NAMES} />
                }
                {/* Name */}
                <TextFieldCars id={EnumTextField.TextFieldID.NAME} label={ isCheckedDealer ?'Ansprechpartner:in Name' : 'Name' } onChange={value => handleOnChange(EnumTextField.TextFieldID.NAME, value)} regex={REGEX_NAMES} />
                
                {/* Name */}
                <TextFieldCars id={EnumTextField.TextFieldID.FAMILYNAME} label={ isCheckedDealer ?'Ansprechpartner:in Nachname' : 'Nachname' } onChange={value => handleOnChange(EnumTextField.TextFieldID.FAMILYNAME, value)} regex={REGEX_NAMES} />
                
                <MuiTelInput id={EnumTextField.TextFieldID.TEL_NR} label="Telefon" defaultCountry='DE' value={ telefonNr } onChange={ (value) => { setTelefonNr(value); } } />

                { isCheckedDealer && <>
                <Paper sx={{ padding:'0.7rem', marginBottom:'1rem' } }elevation={10}>
                  <Typography sx={{ fontWeight:'700' }} variant='subtitle1' component='h4'>Als Händler:in sind Sie verpflichtet bestimmte Angaben zu machen, welche beispielweise Folgendes enthalten sollten:</Typography>
                  <Typography variant='body2' component='p'>Name, Anschrift, Kontaktdaten, Handelsregisternummer, Steuernummer</Typography>
                </Paper>
                <TextFieldArea id={EnumTextField.TextFieldID.IMPRESSUMDATEN} disbled={false} onChange={(value) => handleOnChange(EnumTextField.TextFieldID.IMPRESSUMDATEN, value)} placeholder='Impressumdaten' minRows={8} maxRows={10} />
                </>
                }
                {/* Cardealer */}
                {
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                  <DemoContainer
                    components={[
                      'DesktopDatePicker',
                    ]}
                  >
                    <DemoItem>
                      <DatePicker sx={{ width: '100%' }}
                        label="Geburtsdatum"
                        //views={['month', 'year']}
                        onChange={(date) => setDateValue(date)}
                        value={ dateValue }
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                }
              </>
              : (activeStep === 2) ? <> {/* -------------------- Adresse -------------------- */}
                <Grid container columnSpacing={2}>
                  { isCheckedDealer &&
                  <Grid sx={{ paddingTop:'1rem', paddingBottom:'1rem' }} item xs={12}>
                    <Typography variant='h6' component='h2'>Standort der Fahrzeuge</Typography>
                    <hr />
                  </Grid>
                  }
                  <Grid item xs={9} >
                    <TextFieldCars id={EnumTextField.TextFieldID.STREET} label='Straße' onChange={value => handleOnChange(EnumTextField.TextFieldID.STREET, value)} regex={REGEX_NAMES} />
                  </Grid>
                  <Grid item xs={3} >
                    <TextFieldCars id={EnumTextField.TextFieldID.NR} label='Nr' onChange={value => handleOnChange(EnumTextField.TextFieldID.NR, value)} regex={REGEX_NUMBER} />
                  </Grid>
                  <Grid item xs={8} >
                    <TextFieldCars id={EnumTextField.TextFieldID.CITY} label='Stadt' onChange={value => handleOnChange(EnumTextField.TextFieldID.CITY, value)} regex={REGEX_NAMES} />
                  </Grid>
                  <Grid item xs={4} >
                    <TextFieldCars id={EnumTextField.TextFieldID.ZIPCODE} label='PLZ' onChange={value => handleOnChange(EnumTextField.TextFieldID.ZIPCODE, value)} regex={REGEX_NUMBER} maxLength={5} />
                  </Grid>
                  <Grid item xs={12} >
                    <SelectField idOfSelect='blandid' values={bundesland} objectName='bundesland' selectedValue={selectedBundesland} handleChange={handleChangeBundesland} label='Bundesland' />
                  </Grid>
                </Grid>
              </> : <Grid sx={{ marginTop:'2rem', marginBottom:'2rem' }} container columnSpacing={2}>
                {/* Telefonischer Kontakt */}
                <Grid item xs={12}>
              <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_TELEFON}  checked={isCheckedTelefon} onChange={handleOnChangeCheckbox} />} 
                  label={ 
                    <> 
                    <Typography variant='subtitle1'>Telefonkontakt</Typography> 
                    <Typography variant='body2'>Erlauben Sie der Nutzerin und dem Nutzer, telefonisch zu kontaktieren</Typography>
                    </> 
                  } />
                </Grid>
                <Grid sx={{ margin:'1rem' }} item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={12}>
              <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_EMAIL} checked={isCheckedEmail} onChange={handleOnChangeCheckbox} />} 
                  label={ 
                    <> 
                    <Typography variant='subtitle1'>E-Mail-Kontakt</Typography> 
                    <Typography variant='body2'>Erlauben Sie der Nutzerin und dem Nutzer, per E-Mail zu kontaktieren</Typography>
                    </> 
                  } />
                </Grid>
                <Grid sx={{ margin:'1rem' }} item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={12}>
              <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_CHAT} checked={isCheckedchat} onChange={handleOnChangeCheckbox} />} 
                  label={ 
                    <> 
                    <Typography variant='subtitle1'>Chatkontakt</Typography> 
                    <Typography variant='body2'>Erlauben Sie der Nutzerin und dem Nutzer, über den Chat zu kontaktieren</Typography>
                    </> 
                  } />
                </Grid>
              </Grid>
        }

        {activeStep == 3
          ? <SubmitComponent /> : <ForwardComponent />
        }
      </form>
    </MainComponentWidth>
  </>
  )
}

export default SignUpUser;