
import IAxiosDataSignUp from '../../../../autos-backend/src/interfaces/ISignUpUser.js';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import type { RootState } from '../../redux/store.js';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import * as ReduxHelper from '../../helper/reduxHelper.js';
import TextFieldEmailSignUp from '../mui-components/TextFieldEmail.js';
import TextFieldPassword from '../mui-components/TextFieldPassword.js';
import TextfFieldName from '../mui-components/TextfFieldName.js';

import { useDispatch, useSelector } from 'react-redux';
import { setToInitialState } from '../../redux/features/signupFormularSlice.js';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import { FieldId } from '../../constants/FieldIds.js';
const notifyError = (message: string) => toast.error(message, {
  duration: 4000,
  position: 'bottom-center'

});

const SignUpUser: React.FC = () => {
 
  const dispatch = useDispatch();
  const signUpFormular = useSelector((state: RootState) => state.signupFormular);

  // Checkbox
  const [checked, setChecked] = useState(false);
  const handleOnChangeChekcbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setChecked(event.target.checked);
  }
 
  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    // all Formular field are valid
    if(ReduxHelper.formularSignUpIsValid(signUpFormular.fieldName.isValid,
      signUpFormular.fieldFamilyname.isValid, signUpFormular.fieldEmail.isValid,
      signUpFormular.fieldPassword1.isValid, signUpFormular.fieldPassword2.isValid)) {
      
    const formData: IAxiosDataSignUp = {
      name: signUpFormular.fieldName.value,
      familyname: signUpFormular.fieldFamilyname.value,
      email: signUpFormular.fieldEmail.value,
      password: signUpFormular.fieldPassword1.value,
      password2: signUpFormular.fieldPassword2.value,
      isCarDealer: signUpFormular.fieldCarDealer
    }

    await axios.post<IAxiosDataSignUp>('http://localhost:3001/signup',
      formData)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  } else {
    notifyError("Please check your inputs");
  }
  }

  return (<>
    < Toaster />
    <div style={{ backgroundColor:'whitesmoke', display:'flex',flexDirection:'column', margin: 'auto', width: '400px', paddingTop: '50px' }}>
      <div style={{ margin:'auto', width:'400px', textAlign:'center', marginBottom:'1rem' }}><LockPersonIcon fontSize='large'/></div>
      <h2 style={{margin:'auto', width:'400px', textAlign:'center', marginBottom:'2rem'}}>Sign Up</h2>
      <form onSubmit={handleSubmit} noValidate>
      
      <div style={{ display:'flex', justifyContent:'space-between', width:'400px', marginBottom:'1rem'}}>
        
        {/* Name */}
        <div style={{width: '190px'}}>
          <TextfFieldName id={FieldId.SIGNUP_TEXTFIELD_NAME} htmlForString='name' label='Name' />
        </div>

        {/* Nachname */}
        <div style={{width: '190px'}}>
        <TextfFieldName id={FieldId.SIGNUP_TEXTFIELD_FAMILYNAME} htmlForString='familyname' label='Familyname'/>
        </div>
      </div>

      {/* Email */}
      <TextFieldEmailSignUp id={FieldId.SIGNUP_TEXTFIELD_EMAIL} htmlForString={"Email"} label={"Email"} />

        {/* Password1 */}
        <TextFieldPassword id={FieldId.SIGNUP_TEXTFIELD_PASSWORD} htmlForString={'Password'} label={'Password'} />

        {/* Password2 */}
        <TextFieldPassword id={FieldId.SIGNUP_TEXTFIELD_PASSWORD2} htmlForString={'Password'} label={'Password'} />

        {/* Cardealer */}
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleOnChangeChekcbox}/>} label="Are you a dealer?" />

          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom:'1rem' }}>Sign Up</Button>
          <div style={{ display:'flex', paddingBottom:'4rem'}}>
            <div style={{ width:'40%' }}><p>Forgot Password</p></div>
            <div onClick={() => { dispatch(setToInitialState())  }} style={{ width:'60%' }}><Link to="/signin" style={{ textAlign:'right' }}>Have an account? Sign In</Link></div>
          </div>
      </form>
    </div>
    </>
  )
}

export default SignUpUser;