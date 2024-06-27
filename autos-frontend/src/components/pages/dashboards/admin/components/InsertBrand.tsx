import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
/* Hot Toast */
import TableNormal from "../../../../tables/TableNormal";
import { MainComponentWidth } from "../../../../../themes/Theme";
import { fetchBrand, insertBrand } from "../../../../../redux/features/carBrandSlice";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_NAMES } from "../../../../../regex/REGEX";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { formularNameValid } from "../../../../../regex/validHelper";
import { notifyError } from "../../../../../helper/toastHelper";
import { scrollToTop } from "../../../../../helper/helper";

interface IFormBrand {
  brand: string
};

const formBrand: IFormBrand = {
  brand: ""
}

// Components
const InsertBrand = () => {
  const [form, setForm] = useState(formBrand);
  const values = useSelector((state: RootState) => state.carBrandSlice.brands);
  const dispatch = useDispatch<AppDispatch>();

  scrollToTop();

  useEffect(() => {
    dispatch(fetchBrand());
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = form.brand;
    if(!formularNameValid(value))
      notifyError("error", "Minimal 2 Buchstaben erforderlich")
    else
      dispatch(insertBrand(value))
  }

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  return <>
    <MainComponentWidth>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldCars label="Marke" onChange={value => handleOnChange('brand', value)} regex={REGEX_NAMES} refresh={false} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Automarken"} </Typography>

      <TableNormal listValues={values} />
    </MainComponentWidth>
  </>
};

export default InsertBrand;