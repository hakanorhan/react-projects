import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import * as ReduxHelper from '../../../helper/validHelper.js';
import { MainComponentWidth, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import { SignUpForm } from '../../../../../autos-backend/src/interfaces/IAxiosData.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL, REGEX_NAMES, REGEX_PASSWORD } from '../../../../../autos-backend/src/regex/regex.js';
import PasswordSignUp from '../../formularFields/PasswordSignUp.js';
import PasswordConfirm from '../../formularFields/PasswordConfirm.js';

import { notifyError, notifySuccess } from '../../../helper/toastHelper.js';

const SignUpUser: React.FC = () => {

  const signUpForm: SignUpForm = {
    name: "",
    familyname: "",
    email: "",
    password1: "",
    password2: "",
    isDealer: false
  }

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
  const [isChecked, setChecked] = useState(false);
  const handleOnChangeChekcbox = (event: React.ChangeEvent<HTMLInputElement>) => {

    setChecked(event.target.checked);
  }

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();

    const name = form.name
    const familyname = form.familyname;
    const email = form.email;
    const password1 = form.password1;
    const password2 = form.password2;


    // all Formular field are valid
    if (ReduxHelper.formularSignUpIsValid(name, familyname, email, password1, password2)) {


      await axios.post('http://localhost:3001/signup',
        { form, isChecked })
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


  return (<>
    < Toaster />
    <MainComponentWidth>
      <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
      <Typography variant='h4' component='h1'>Sign Up</Typography>
      <form onSubmit={handleSubmit} noValidate>

        <DivTwoFieldsWithSpaceBetween>

          {/* Name */}
          <DivWidthTwoFieldsRow>
            <TextFieldCars id='name' label='Name' onChange={value => handleOnChange('name', value)} regex={REGEX_NAMES} />
          </DivWidthTwoFieldsRow>
          {/* Nachname */}
          <DivWidthTwoFieldsRow>
            <TextFieldCars id='familyname' label='Familyname' onChange={value => handleOnChange('familyname', value)} regex={REGEX_NAMES} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        {/* Email */}
        <Box>
          <TextFieldCars id='email' label='Email' onChange={value => handleOnChange('email', value,)} regex={REGEX_EMAIL} />
        </Box>
        <Box sx={{ marginBottom: '1rem' }}>
          <PasswordSignUp id='password1' label='Password' onChange={value => handleOnChange('password1', value)} regex={REGEX_PASSWORD} />
        </Box>
        <PasswordConfirm id='password2' label='Confirm Password' onChange={value => handleOnChange('password2', value)} password1={form.password1} regex={REGEX_PASSWORD} />


        {/* Cardealer */}
        <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={isChecked} onChange={handleOnChangeChekcbox} />} label="Are you a dealer?" />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Sign Up</Button>
        <div style={{ display: 'flex', paddingBottom: '4rem' }}>
          <div style={{ width: '40%', color: primaryColorMain }}><p>Forgot Password</p></div>
          <div style={{ display: 'flex', width: '60%', justifyContent: 'end' }}><Link to="/signin" style={{ textDecoration: 'none', color: primaryColorMain }}>Have an account? Sign In</Link></div>
        </div>
      </form>
    </MainComponentWidth>
  </>
  )
}

export default SignUpUser;