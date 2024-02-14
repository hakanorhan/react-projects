import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { REGEX_EMAIL } from '../../../../autos-backend/src/regex/Regex.js';
/* Interfaces */
import AxiosData from '../../../../autos-backend/src/interfaces/LoginUser.js';

/* Material UI */
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button } from '@mui/material';
import TextFieldEmailSignIn from '../mui-components/TextFieldEmailSignIn.js';
import TextFieldPasswordSignIn from '../mui-components/TextFieldPasswordSignIn.js';

/* Redux */
import type { RootState } from '../../redux/store.js';
import { useSelector, useDispatch } from 'react-redux';
import { setToInitialStateSignIn } from '../../redux/features/signinFormularSlice.js';
import { setToInitialStatePassword } from '../../redux/features/passwordPatternSlice.js';

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

    // if email and password is valid
    if (signInFormular.valueEmail.match(REGEX_EMAIL) && signInFormular.valuePassword.length !== 0) {
      const formData: AxiosData = {
        // Redux
        email: signInFormular.valueEmail,
        password: signInFormular.valuePassword
      }

      await axios.post<AxiosData>('http://localhost:3001/signin',
        formData)
        .then(response => {

          dispatch(setToInitialStateSignIn()), dispatch(setToInitialStatePassword())
          notifySuccess("Guten Tag, Hakan")
        })
        .catch(err => {
          notifyError(err.response.data.message);
        });
    } else {
      if (signInFormular.valueEmail.match(REGEX_EMAIL) == null) {
        notifyError("Email is invalid");
      } else if (signInFormular.valuePassword.length === 0) {
        notifyError("Please insert a password");
      }
    }

    console.log("SignIn Button: " + signInFormular.valueEmail.match(REGEX_EMAIL))
  }

  return (
    <>
      <Toaster />
      <div style={{ backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', margin: 'auto', width: '400px', paddingTop: '60px' }}>
        <div style={{ margin: 'auto', width: '400px', textAlign: 'center', marginBottom: '1rem' }}><LockPersonIcon fontSize='large' /></div>
        <h2 style={{ margin: 'auto', width: '400px', textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>
        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <TextFieldEmailSignIn id={"email"} htmlForString={"Email"} label={"Email"} />

          {/* Password */}
          <TextFieldPasswordSignIn id={'passwordSignIn'} htmlForString={'Password'} label={'Password'} />

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