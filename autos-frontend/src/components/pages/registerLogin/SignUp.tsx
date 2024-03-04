
import IAxiosDataSignUp from '../../../../../autos-backend/src/interfaces/ISignUp.js';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import * as ReduxHelper from '../../../helper/validHelper.js';
import { DivFormularAdmin, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow, HeaderIcon, primaryColorMain } from '../../../themes/ThemeColor.js';

import { setNewImage } from "../../../redux/features/imageSlice.js";
import { useDispatch } from "react-redux";

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import TextFieldName from '../../formularFields/TextFieldName.js';
import TextFieldEmail from '../../formularFields/TextFieldEmail.js';
import TextFieldPasswordConfirm from '../../formularFields/TextFieldPasswordConfirm.js';
import { IUseForm } from '../../../interfaces/IUseForm.js';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
  duration: 4000,
  position: 'top-center'

});

const SignUpUser: React.FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNewImage('signin'));
  }, [dispatch]) 

  const navigate = useNavigate();
  
  // Name
    const nameRef = useRef<HTMLInputElement>(null);
  // Familyname
  const familynameRef = useRef<HTMLInputElement>(null);
  // Email
  const emailRef = useRef<HTMLInputElement>(null);
  // Password1
  const password1Ref = useRef<HTMLInputElement>(null);
  // Password2
  const password2Ref = useRef<HTMLInputElement>(null);
  
  // Checkbox
  const [isChecked, setChecked] = useState(false);
  const handleOnChangeChekcbox = (event: React.ChangeEvent<HTMLInputElement>) => {

    setChecked(event.target.checked);
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {

    event.preventDefault();

    const name = nameRef.current?.value;
    const familyname = familynameRef.current?.value;
    const email = emailRef.current?.value;
    const password1 = password1Ref.current?.value;
    const password2 = password2Ref.current?.value;

    if (name && familyname && email && password1 && password2) {

      // all Formular field are valid
      if (ReduxHelper.formularSignUpIsValid(name, familyname, email, password1, password2)) {

        const formData: IAxiosDataSignUp = {
          name: name,
          familyname: familyname,
          email: email,
          password: password1,
          password2: password2,
          isCarDealer: isChecked
        }

        await axios.post<IResponseSignup>('http://localhost:3001/signup',
          formData)
          .then(function (response) {
            notifySuccess("response.data.message")
            navigate('/signin', { state: { successMessage: "Signup successful!" } })

          }).catch(function (err) {
            notifyError(err.response.data.message)
          })
      } else {
        notifyError("Please check your inputs");
      }
    } else {
      notifyError("Please check your inputs");
    }
  }

  // Password and PasswordConfirmation
  const password: IUseForm = {
    id: 'password',
    label: 'Password',
    inputRef: password1Ref
  }
  const passwordConfirm: IUseForm = {
    id:'passwordConfirm',
    label:' Confirm Password',
    inputRef: password2Ref
  }

  return (<>
    < Toaster />
    <DivFormularAdmin>
      <HeaderIcon><LockPersonIcon fontSize='large' /></HeaderIcon>
      <Typography variant='h4' component='h1'>Sign Up</Typography>
      <form onSubmit={handleSubmit} noValidate>

        <DivTwoFieldsWithSpaceBetween>

          {/* Name */}
          <DivWidthTwoFieldsRow>
            <TextFieldName id='name' label='Name' inputRef={nameRef} />
          </DivWidthTwoFieldsRow>
          {/* Nachname */}
          <DivWidthTwoFieldsRow>
            <TextFieldName id='familyname' label='Familyname' inputRef={familynameRef} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        {/* Email */}
        <Box>
          <TextFieldEmail id='email' label='Email' inputRef={emailRef} />
        </Box>

        <TextFieldPasswordConfirm passwordField={password} passwordConfirmField={passwordConfirm} />

        {/* Cardealer */}
        <FormControlLabel sx={{ color: primaryColorMain }} control={<Checkbox checked={isChecked} onChange={handleOnChangeChekcbox} />} label="Are you a dealer?" />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Sign Up</Button>
        <div style={{ display: 'flex', paddingBottom: '4rem' }}>
          <div style={{ width: '40%', color: primaryColorMain }}><p>Forgot Password</p></div>
          <div style={{display: 'flex', width: '60%', justifyContent:'end' }}><Link to="/signin" style={{ textDecoration: 'none', color: primaryColorMain }}>Have an account? Sign In</Link></div>
        </div>
      </form>
    </DivFormularAdmin>
  </>
  )
}

export default SignUpUser;