import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import 'dayjs/locale/de';
import { Link } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Checkbox, FormControlLabel, Box, Typography, Stepper, StepLabel, Step, Grid, Paper, SelectChangeEvent } from '@mui/material';
import { MainComponentWidth, HeaderIcon, textFieldSMWitdh, buttonHeight, COMPONENT_DISTANCE } from '../../../themes/Theme.js';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs';

import * as EnumCheck from '../../../enums/CheckBoxID';
import * as EnumTextField from '../../../enums/TextFieldID';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { AxiosDataSignup, SignUpForm } from '../../../interfaces/types.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL, REGEX_NAMES, REGEX_PASSWORD, REGEX_STREET, REGEX_STREET_NR, REGEX_ZIPCODE } from '../../../regex/REGEX.js';
import PasswordSignUp from '../../formularFields/PasswordSignUp.js';
import PasswordConfirm from '../../formularFields/PasswordConfirm.js';

import { notifyError } from '../../../helper/toastHelper.js';
import SelectField from '../../formularFields/SelectField.js';
import { MuiTelInput } from 'mui-tel-input'
import TextFieldArea from '../../formularFields/TextFieldArea.js';
import { useEffectFetch } from '../../../helper/DataLoading.js';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';
import * as ValidHelper from '../../../helper/validHelper.js';
import { useNavigate } from 'react-router-dom';

const steps = ['Konto', 'Details', 'Adresse', 'Kontakt'];

const SignUpUser: React.FC = () => {

  const navigate = useNavigate();

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

  const [federalState, setFederalState] = useState<any[]>([]);
  const [selectedBundesland, setSelectedBundesland] = useState<string>("");

  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
  const [telefonNr, setTelefonNr] = useState("");

  const [emailIsValidChecked, setEmailIsValidChecked] = useState(false);
  const [emailNotUsed, setEmailNotUsed] = useState(false);
  const [emailUsedMessage, setEmailUsedMessage] = useState<null | string>('\u00A0');

  useEffectFetch(URLs.FETCH_BUNDESLAENDER, setFederalState);

  const [form, setForm] = useState<SignUpForm>(
    signUpForm
  )

  const handleOnChange = (fieldName: string, fieldValue: string | boolean) => {
    setForm({ ...form, [fieldName]: fieldValue })

    if (fieldName === "email") {
      if (typeof fieldValue === 'string' && ValidHelper.formularEmailValid(fieldValue)) {
        setEmailIsValidChecked(true);
      } else setEmailIsValidChecked(false)
    }
  }

  // Checkbox
  const [isCheckedDealer, setIsCheckedDealer] = useState(false);
  const [isCheckedTelefon, setIsCheckedTelefon] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);


  useEffect(() => {
    if (emailIsValidChecked) {
      async function checkEmail() {
        try {
          const value = form.email;
          const response = await axios.post(URLs.ORIGIN_SERVER + URLs.POST_SIGINUP_EMAILCHECK, { value }, { withCredentials: true })
          setEmailIsValidChecked(false);
          setEmailNotUsed(true);
          const message = response.data.message;
          setEmailUsedMessage(message);
        } catch (error: any) {
          setEmailNotUsed(false);
          setEmailIsValidChecked(false);
          const message = error.response.data.message;
          setEmailUsedMessage(message);
        }
      }

      checkEmail();
    }

  }, [emailIsValidChecked])

  /**
   * Next step if all formular fields valid
   */
  const activeStepHandler = () => {
    if (activeStep === 0) {
      const password1 = form.password1;
      const password2 = form.password2;
      if (!emailNotUsed) {
        notifyError("email-field", "Bitte prüfen Sie das Email-Feld.")
      } else if (!ValidHelper.password2Valid(password1, password2)) {
        notifyError("password-field", "Bitte prüfen Sie die Passwortfelder.")
      } else {
        setActiveStep(activeStep + 1);
      }
    }
    if (activeStep === 1) {
      const name = form.name;
      const surname = form.familyname;

      const currentDate = dayjs();
      const diff = currentDate.diff(dateValue, 'day');

      if (!ValidHelper.formularNameValid(name)) {
        notifyError("name-field", "Bitte prüfen Sie das Name-Feld.")
      } else if (!ValidHelper.formularNameValid(surname)) {
        notifyError("surname-field", "Bitte prüfen Sie das Nachname-Feld")
      } else if (!telefonNr || telefonNr.length <= 7) {
        notifyError("phone-field", "Bitte prüfen Sie das Telefon-Feld.")
      } else if(isCheckedDealer && !form.impressumdaten || form.impressumdaten === "") {
        notifyError("impressum-field", "Bitte prüfen Sie das Impressum-Feld.")
      } else if (diff <= 365 * 18) {
        notifyError("birth-field", "Geburtsdatum ist kleiner 18.")
      } else  {
        setActiveStep(activeStep + 1);
      }
    } if (activeStep === 2) {
      const street = form.street;
      const houseNumber = form.nr;
      const city = form.city;
      const zipcode = form.zipcode;

      if (!ValidHelper.formularStreetIsValid(street)) {
        notifyError("street-field", "Bitte Straße-Feld prüfen")
      } else if (!ValidHelper.formularStreetNrIsValid(houseNumber)) {
        notifyError("housenumber-field", "Bitte Hausnummer prüfen")
      } else if (!ValidHelper.formularNameValid(city)) {
        notifyError("city-field", "Bitte Stadtangabe prüfen");
      } else if (!ValidHelper.formularZipCodeIsVald(zipcode)) {
        notifyError("zipcode-field", "Bitte Postleitzahl prüfen")
      } else if (selectedBundesland === "") {
        notifyError("federalstate-field", "Bitte wählen Sie ein Bundesland");
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  }

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
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

    if (!(isCheckedEmail || isCheckedTelefon)) {
      notifyError("contact-field", "Bitte wählen Sie mindestens eine Kontaktmöglichkeit aus.")
    }
    else {
      const formattedDate = dateValue?.format('DD-MM-YYYY');
      if(formattedDate) {
      const axiosData: AxiosDataSignup = { form, selectedBundesland, isCheckedDealer, isCheckedEmail, isCheckedTelefon, formattedDate, telefonNr }

      try {
        await axios.post(URLs.ORIGIN_SERVER + URLs.POST_SIGINUP, axiosData, { withCredentials: true })
        navigate(URLs.POST_SIGNIN);
      }catch(error: any) {
        const message = error.response.data.message;
        notifyError(message, message);
      }
    } else {
      notifyError("error", "Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      navigate(0);
    }
  }
  }

  const SubmitComponent = () => {
    return <>
      <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem', height: buttonHeight }}>Registrieren</Button>
    </>
  }

  const ForwardComponent = () => {
    return <> <Button fullWidth onClick={() => { activeStepHandler() }} type='button' variant="contained" sx={{ marginBottom: '1rem', height: buttonHeight }}>Weiter</Button>
              <div style={{ display: 'flex', paddingBottom: '4rem' }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end' }}><Link to="/signin" style={{ textDecoration: 'none' }}><Typography sx={{ color: 'primary.main' }}>Bereits registriert? Login</Typography></Link></Box>
      </div>
      </>
  }

  return (<>
    < Toaster />
    <MainComponentWidth>
      <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '7rem', marginBottom: '7rem' }}>
        <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>

        <Typography variant='h4' component="h1" sx={{ margin: 'auto', color: 'primary.main' }}>Registrieren</Typography>
      </Box>
      <Stepper activeStep={activeStep} sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {
          steps.map((step, index) => (
            <Step completed={index < activeStep} key={index}>
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
                <TextFieldCars id={EnumTextField.TextFieldID.EMAIL} label='Email' onChange={value => handleOnChange(EnumTextField.TextFieldID.EMAIL, value,)} regex={REGEX_EMAIL} checkEmail={emailNotUsed} />
                <Typography sx={{ marginBottom: COMPONENT_DISTANCE, color: 'text.primary' }}>{ValidHelper.formularEmailValid(form.email) ? emailUsedMessage : '\u00A0'}</Typography>
              </Box>
              <Box sx={{ marginBottom: COMPONENT_DISTANCE }}>
                <PasswordSignUp id={EnumTextField.TextFieldID.PASSWORD1} label='Password' onChange={value => handleOnChange(EnumTextField.TextFieldID.PASSWORD1, value)} regex={REGEX_PASSWORD} />
              </Box>
              <PasswordConfirm id={EnumTextField.TextFieldID.PASSWORD2} label='Confirm Password' onChange={value => handleOnChange(EnumTextField.TextFieldID.PASSWORD2, value)} password1={form.password1} regex={REGEX_PASSWORD} />


              {/* Cardealer */}
              <FormControlLabel sx={{ color: 'text.primary' }} control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_DEALER} checked={isCheckedDealer} onChange={handleOnChangeCheckbox} />} label="Sind Sie ein:e Händler:in ?" />

            </> : (activeStep === 1)
              ? <> {/* -------------------- Details -------------------- */}
                {/* Autohaus Companyname, not cardealer*/}
                {isCheckedDealer &&
                  <TextFieldCars id={EnumTextField.TextFieldID.COMPANYNAME} label='Autohaus' onChange={value => handleOnChange(EnumTextField.TextFieldID.COMPANYNAME, value)} regex={REGEX_NAMES} />
                }
                {/* Name */}
                <TextFieldCars id={EnumTextField.TextFieldID.NAME} label={isCheckedDealer ? 'Ansprechpartner:in Name' : 'Name'} onChange={value => handleOnChange(EnumTextField.TextFieldID.NAME, value)} regex={REGEX_NAMES} />

                {/* Name */}
                <TextFieldCars id={EnumTextField.TextFieldID.FAMILYNAME} label={isCheckedDealer ? 'Ansprechpartner:in Nachname' : 'Nachname'} onChange={value => handleOnChange(EnumTextField.TextFieldID.FAMILYNAME, value)} regex={REGEX_NAMES} />

                <MuiTelInput required variant='standard' id={EnumTextField.TextFieldID.TEL_NR} label="Telefon" defaultCountry='DE' value={telefonNr} onChange={(value) => { setTelefonNr(value); }} />

                {isCheckedDealer && <>
                  <Paper sx={{ padding: '0.7rem', marginBottom: COMPONENT_DISTANCE }} elevation={10}>
                    <Typography sx={{ fontWeight: '700' }} variant='subtitle1' component='h4'>Als Händler:in sind Sie verpflichtet bestimmte Angaben zu machen, welche beispielweise Folgendes enthalten sollten:</Typography>
                    <Typography variant='body2' component='p'>Name, Anschrift, Kontaktdaten, Handelsregisternummer, Steuernummer</Typography>
                  </Paper>
                  <TextFieldArea id={EnumTextField.TextFieldID.IMPRESSUMDATEN} disbled={false} onChange={(value) => handleOnChange(EnumTextField.TextFieldID.IMPRESSUMDATEN, value)} placeholder='Impressumdaten' minRows={8} maxRows={10} />
                </>
                }
                {/* Date */}
                {
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                    <DemoContainer
                      components={[
                        'DatePicker',
                      ]}
                    >
                      <DemoItem>
                        <DatePicker sx={{ width: { xs: '100%', md: textFieldSMWitdh } }}
                          slotProps={{ textField: { variant: 'standard', size: 'medium', fullWidth: true } }}
                          label="Geburtsdatum"
                          //views={['month', 'year']}
                          onChange={(date) => setDateValue(date)}
                          value={dateValue}

                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                }
              </>
              : (activeStep === 2) ? <> {/* -------------------- Adresse -------------------- */}
                <Grid container columnSpacing={2}>
                  {isCheckedDealer &&
                    <Grid sx={{ paddingTop: '1rem', paddingBottom: '1rem' }} item xs={12}>
                      <Typography variant='h6' component='h2'>Standort der Fahrzeuge</Typography>
                      <hr />
                    </Grid>
                  }
                  <Grid item xs={8} >
                    <TextFieldCars id={EnumTextField.TextFieldID.STREET} label='Straße' onChange={value => handleOnChange(EnumTextField.TextFieldID.STREET, value)} regex={REGEX_STREET} />
                  </Grid>
                  <Grid item xs={4} >
                    <TextFieldCars id={EnumTextField.TextFieldID.NR} label='Nr' onChange={value => handleOnChange(EnumTextField.TextFieldID.NR, value)} regex={REGEX_STREET_NR} maxLength={5} />
                  </Grid>
                  <Grid item xs={7.5} >
                    <TextFieldCars id={EnumTextField.TextFieldID.CITY} label='Stadt' onChange={value => handleOnChange(EnumTextField.TextFieldID.CITY, value)} regex={REGEX_NAMES} />
                  </Grid>
                  <Grid item xs={4.5} >
                    <TextFieldCars id={EnumTextField.TextFieldID.ZIPCODE} label='PLZ' onChange={value => handleOnChange(EnumTextField.TextFieldID.ZIPCODE, value)} regex={REGEX_ZIPCODE} maxLength={5} />
                  </Grid>
                  <Grid item xs={12} >
                    <SelectField idOfSelect='federal_state_id' values={federalState} objectName='federal_state' selectedValue={selectedBundesland} handleChange={handleChangeBundesland} label='Bundesland' />
                  </Grid>
                </Grid>
              </> : <Grid sx={{ marginTop: '2rem', marginBottom: '2rem' }} container columnSpacing={2}>
                {/* Telefonischer Kontakt */}
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_TELEFON} checked={isCheckedTelefon} onChange={handleOnChangeCheckbox} />}
                    label={
                      <>
                        <Typography variant='subtitle1'>Telefonkontakt</Typography>
                        <Typography variant='body2'>Erlauben Sie der Nutzerin und dem Nutzer, telefonisch zu kontaktieren</Typography>
                      </>
                    } />
                </Grid>
                <Grid sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }} item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox id={EnumCheck.CheckBoxID.IS_CHECKED_EMAIL} checked={isCheckedEmail} onChange={handleOnChangeCheckbox} />}
                    label={
                      <>
                        <Typography variant='subtitle1'>E-Mail-Kontakt</Typography>
                        <Typography variant='body2'>Erlauben Sie der Nutzerin und dem Nutzer, per E-Mail zu kontaktieren</Typography>
                      </>
                    } />
                </Grid>
                <Grid sx={{ marginTop: COMPONENT_DISTANCE }} item xs={12}>
                  <hr />
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