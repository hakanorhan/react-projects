import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
/* Interfaces */
import LoginUser from '../../../../autos-backend/src/interfaces/LoginUser.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button } from '@mui/material';
import TextFieldEmail from '../mui-components/TextFieldEmail.js';
import TextFieldPasswordSignIn from '../mui-components/TextFieldPassword.js';

/* Redux */
import type { RootState } from '../../redux/store.js';
import { useSelector, useDispatch } from 'react-redux';
import { setToInitialStateSignIn } from '../../redux/features/signinFormularSlice.js';
import { setToInitialStatePassword } from '../../redux/features/passwordPatternSlice.js';

import { IResponseSignInData } from '..7../../../../autos-backend/src/interfaces/signin/IResponseSignInData.js';

import { FieldId } from '../../constants/FieldIds.js';
import * as ReduxHelper from '../../helper/reduxHelper.js';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
  duration: 2000,
  position: 'top-center'

});

const SignIn: React.FC = () => {

  const dispatch = useDispatch();

  const signInFormular = useSelector((state: RootState) => state.signinFormular);

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email: string = signInFormular.fieldEmail.value;
    const password: string = signInFormular.fieldPassword.value;
    console.log("Handle submit: " + password)

    // if email and password is valid
    if (ReduxHelper.formularValuesValid(signInFormular.fieldEmail.isValid, password)) {
      const formData: LoginUser = {
        // Redux
        email: email,
        password: password
      }

      await axios.post<IResponseSignInData>('http://localhost:3001/signin',
        formData)
        .then(response => {
          dispatch(setToInitialStateSignIn()), dispatch(setToInitialStatePassword())
          notifySuccess("Guten Tag, " + response.data.name)
        })
        .catch(err => {
          notifyError(err.response.data.message);
        });
    } else {
      notifyError("Email or Password is invalid");
    }
  }

  return (
    <>
      <Toaster />
      <div style={{ backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', margin: 'auto', width: '400px', paddingTop: '60px' }}>
        <div style={{ margin: 'auto', width: '400px', textAlign: 'center', marginBottom: '1rem' }}><LockPersonIcon fontSize='large' /></div>
        <h2 style={{ margin: 'auto', width: '400px', textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>
        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <TextFieldEmail id={FieldId.SIGNIN_TEXTFIELD_EMAIL} htmlForString={"Email"} label={"Email"} />

          {/* Password */}
          <TextFieldPasswordSignIn id={FieldId.SIGNIN_TEXTFIELD_PASSWORD} htmlForString={'Password'} label={'Password'} />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Sign in</Button>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <div style={{ width: '40%' }}><p>Forgot Password</p></div>
            <div style={{ width: '60%' }}><Link onClick={() => { dispatch(setToInitialStateSignIn()), dispatch(setToInitialStatePassword()) }} to="/signup" style={{ textAlign: 'right' }}>Don't have an account? Sign Up </Link></div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn;