import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
/* Interfaces */
import LoginUser from '../../../../../autos-backend/src/interfaces/LoginUser.js';
import { Roles } from '../../../../../autos-backend/src/enums/Roles.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Typography } from '@mui/material';
import { DivFormularAdmin, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { IResponseSignInData } from '..7../../../../autos-backend/src/interfaces/signin/IResponseSignInData.js';

import * as validHelper from '../../../helper/validHelper.js';

import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import TextFieldEmail from '../../formularFields/TextFieldEmail.js';
import TextFieldPassword from '../../formularFields/TextFieldPassword.js';
import { URLs } from '../../../../../autos-backend/src/enums/URLs.js';
import { setRole, setUserLoggedIn } from '../../../redux/features/userlogged.js';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
  duration: 2000,
  position: 'top-center'

});

const SignIn: React.FC = () => {
/*
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(setNewImage('signin'));
  }, [])  
  */

  //const successMessage = state && state.successMessage;
  //if (successMessage) { }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    console.log("Siginin.tsx Zeile 58");
    // if email and password is valid
    if (email && password && validHelper.formularValuesValidSignIn(email, password)) {
      const formData: LoginUser = {
        email: email,
        password: password
      }
      console.log(`${URLs.ORIGIN_SERVER}${URLs.POST_SIGNIN}`)
      setLoading(true);
      await axios.post<IResponseSignInData>(`${URLs.ORIGIN_SERVER}${URLs.POST_SIGNIN}`,
        formData, { withCredentials: true })
        .then(function (response) {
          console.log(response)
          // personId name and role exists
          if (response.data.personId && response.data.name && response.data.role) {
            setLoading(false);
            switch (response.data.role) {
              case Roles.ADMIN: {
                console.log("Navigate Admin");
                dispatch(setRole(Roles.ADMIN));
                dispatch(setUserLoggedIn(true));
                navigate('/admin/writedata');
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
            }
            }
          }
        })
        .catch(err => {
          setLoading(false);
          console.log("SignIn.tsx Error: Zeile 91");
          notifyError(err.response.data.message);
        });
    } else {
      setLoading(false);
      console.log("Email Password invalid 96");
      notifyError("Email or Password is invalid");
    }
  }

  if(loading) {
    console.log("Div ...loading");
    return <div>...Loading</div>
  }

  return (
    <>
      <Toaster />
      <DivFormularAdmin>
        <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
        <Typography variant='h4' component="h1">Sign In</Typography>
        <form onSubmit={handleSubmit} noValidate>

          <TextFieldEmail id='email' label='Email' inputRef={emailRef} />
          <TextFieldPassword id='password' label='Password' inputRef={passwordRef} />

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
      </DivFormularAdmin>
    </>
  )
}

export default SignIn;