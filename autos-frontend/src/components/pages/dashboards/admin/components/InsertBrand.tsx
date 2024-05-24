import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { MainComponentWidth } from "../../../../../themes/Theme";
import { fetchBrand, insertBrand } from "../../../../../redux/features/carBrandSlice";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_NAMES } from "../../../../../../../autos-backend/src/regex/regex";
import { notifyError, notifySuccess } from "../../../../../helper/toastHelper";
import { Brand } from "../../../../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";

interface IFormBrand {
  brand: string
};

const formBrand: IFormBrand = {
  brand: ""
}

// Components
const InsertBrand = () => {
  const [form, setForm] = useState(formBrand);
  const [insertId, setInsertId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);
  const values = useSelector((state: RootState) => state.responseData.brands);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBrand());
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = form.brand;
    dispatch(insertBrand(value))
  }

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  return <><Toaster />
    <MainComponentWidth>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldCars id="brand" label="Marke" onChange={value => handleOnChange('brand', value)} regex={REGEX_NAMES} refresh={refresh} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Automarken"} </Typography>
      
      <TableNormal listValues={ values } insertId={insertId} />
    </MainComponentWidth>
  </>
};

export default InsertBrand;