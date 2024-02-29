import { IRequestSignUpEmployee, IResponseSignUpEmployee } from '../../../../../autos-backend/src/interfaces/ISignUp.js';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import * as ValidHelper from '../../../helper/validHelper.js';

import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { MuiTelInput } from 'mui-tel-input';


/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import { DivFormularAdmin, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow, ValidParagraph, primaryColorMain } from '../../../themes/ThemeColor.js';
import TextFieldName from '../../formularFields/TextFieldName.js';
import TextFieldEmail from '../../formularFields/TextFieldEmail.js';
import TextFieldPasswordConfirm from '../../formularFields/TextFieldPasswordConfirm.js';
import { IUseForm } from '../../../interfaces/IUseForm.js';
import TextFieldAddress from '../../formularFields/TextFieldAddress.js';
import Address from '../../../../../autos-backend/src/interfaces/Address.js';
const notifyError = (message: string) => toast.error(message, {
    duration: 4000,
    position: 'bottom-center'

});

const notifySuccess = (message: string) => toast.success(message, {
    duration: 4000,
    position: 'top-center'

});

const AdminSignup: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        
    }, [])

    // TelNr
    const [telNr, setTelNr] = React.useState('')
    const telRef = useRef<HTMLInputElement>(null);
    const handleChangeTelNr = (telNr: string) => {
        setTelNr(telNr)
    }

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

    const birthRef = useRef<HTMLInputElement>(null);

    const passwordField: IUseForm = { id:'password', label:'Password', inputRef: password1Ref };
    const passwordFieldConfirm : IUseForm = { id:'confirm', label:'Password Confirm', inputRef: password2Ref };

    // Address
    const streetNrRef = useRef<HTMLInputElement>(null);
    const zipcodeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const bundeslandRef = useRef<HTMLInputElement>(null);

    const streetNrField: IUseForm = { id: 'addressNr', label: 'Straße Nr', inputRef: streetNrRef };
    const zipcodeField: IUseForm = { id: 'zipcode', label:'Postleitzahl', inputRef: zipcodeRef };
    const cityField: IUseForm = { id: 'city', label: 'Stadt', inputRef: cityRef };
    const bundeslandField: IUseForm = { id:'federalState', label:'Bundesland', inputRef: bundeslandRef };


    const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {

        event.preventDefault();

        const name = nameRef.current?.value;
        const familyname = familynameRef.current?.value;
        const email = emailRef.current?.value;
        const password1 = password1Ref.current?.value;
        const password2 = password2Ref.current?.value;
        const telNr = telRef.current?.value;
        const birth = birthRef.current?.value;
        const streetNr = streetNrRef.current?.value;
        const zipcode = zipcodeRef.current?.value;
        const city = cityRef.current?.value;
        const bundesland = bundeslandRef.current?.value;

        if (name && familyname && email && password1 && password2 && telNr &&
             streetNr && zipcode && city && bundesland && birth) {
            
            const adress: Address = { streetnr: streetNr, zipcode: zipcode, bundeslandid: bundesland, city: city }

            // all Formular field are valid
            if (ValidHelper.formularSignUpIsValid(name, familyname, email, password1, password2)) {

                const formData: IRequestSignUpEmployee = {
                    name: name,
                    familyname: familyname,
                    email: email,
                    password: password1,
                    password2: password2,
                    birth: birth,
                    adress: adress
                }

                await axios.post<IResponseSignUpEmployee>('http://localhost:3001/signup',
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


    return (<>
        < Toaster />
        <form onSubmit={handleSubmit} noValidate>
            <DivFormularAdmin>

                {/* Left side */}
                
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

                    {/* Birth */}
                    <Box>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DemoItem >
                                <DatePicker label="Birth" defaultValue={dayjs('2022-04-17')} />
                            </DemoItem>
                        </LocalizationProvider>
                    </Box>

                    {/* TelNr */}
                    <Box>
                        <MuiTelInput label="TelNr" defaultCountry={'DE'} value={telNr} onChange={handleChangeTelNr} />
                    </Box>

                    <TextFieldAddress cityField={cityField} streetNrField={streetNrField} zipcodeField={zipcodeField} bundeslandField={bundeslandField} />

                    <TextFieldPasswordConfirm passwordField={passwordField} passwordConfirmField={passwordFieldConfirm} />
                

                <Box>
                    <Button fullWidth type='submit' variant="contained">Create</Button>
                </Box>

            </DivFormularAdmin>

        </form>
    </>
    )
}

export default AdminSignup;