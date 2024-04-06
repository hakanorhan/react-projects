import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/* Interfaces */
import { Roles } from '../../../../../autos-backend/src/enums/Roles.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Typography } from '@mui/material';
import { MainComponentWidth, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { IResponseSignInData } from '..7../../../../autos-backend/src/interfaces/signin/IResponseSignInData.js';

import * as validHelper from '../../../helper/validHelper.js';

// TODO: set newimage
//import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';
import { setRole, setUserLoggedIn } from '../../../redux/features/userlogged.js';
import TextFieldCars from '../../formularFields/TextFieldCars.js';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../../../../autos-backend/src/regex/regex.js';
import TextFieldCarsPassword1 from '../../formularFields/TextFieldCarsPassword.js';
import { SignInForm } from '../../../../../autos-backend/src/interfaces/IAxiosData.js';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const SignIn: React.FC = () => {

  const signInForm: SignInForm = {
    email: "",
    password: ""
  }

  const [form, setForm] = useState<SignInForm>(
    signInForm
  );

    const handleOnChange = (fieldName: string, fieldValue: string) => {
      setForm({...form, [fieldName] : fieldValue})
    }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // if email and password is valid
    if (form.email && form.password && validHelper.formularValuesValidSignIn(form.email, form.password)) {
      
      await axios.post<IResponseSignInData>(`${URLs.ORIGIN_SERVER}${URLs.POST_SIGNIN}`,
        form, { withCredentials: true })
        .then(function (response) {
          console.log(response)
          // personId name and role exists
          if (response.data.personId && response.data.name && response.data.role) {
            
            switch (response.data.role) {
              case Roles.ADMIN: {
                console.log("Navigate Admin");
                dispatch(setRole(Roles.ADMIN));
                dispatch(setUserLoggedIn(true));
                navigate(URLs.FETCH_INSERATE_PUBLISH);
              } break;
              case Roles.USER: {
                console.log("Navigate User");
                dispatch(setUserLoggedIn(true));
                dispatch(setRole(Roles.USER));
                navigate('/inserieren');
              } break;
              default : { 
                navigate('/signin'); 
                console.log("Default signin");
                dispatch(setRole(Roles.USER));
              }
            }
          }
        })
        .catch(err => {
          console.log("SignIn.tsx Error: Zeile 91");
          notifyError(err.response.data.message);
        });
    } else {
      console.log("Email Password invalid 96");
      notifyError("Email or Password is invalid");
    }
  }

  return (
    <>
      <Toaster />
      <MainComponentWidth>
        <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
        <Typography variant='h4' component="h1">Sign In</Typography>
        <form onSubmit={handleSubmit} noValidate>

          <TextFieldCars id='email' label='Email' onChange={ value => handleOnChange('email', value)} regex={REGEX_EMAIL} /> 
          <TextFieldCarsPassword1 id='password' label='Password' onChange={ value => handleOnChange('password', value) } regex={REGEX_PASSWORD}  />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Sign in</Button>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <div style={{ width: '40%', color: primaryColorMain }}>
              <p>Forgot Password</p>
            </div>
            <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/signup" style={{ textDecoration: 'none', color: primaryColorMain }}>Don't have an account? Sign Up </Link>
            </div>
          </div>
        </form>
      </MainComponentWidth>
    </>
  )
}

export default SignIn;


/*
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(setNewImage('signin'));
  }, [])  
  */

  //const successMessage = state && state.successMessage;
  //if (successMessage) { }