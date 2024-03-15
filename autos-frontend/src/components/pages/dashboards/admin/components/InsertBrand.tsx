import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { DivFormularAdmin } from "../../../../../themes/ThemeColor";
import { handleSubmitPostBrand } from "../../../../../helper/submits";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_NAMES } from "../../../../../../../autos-backend/src/regex/regex";

// Components
const InsertBrand = () => {
  const [form, setForm] = useState({
    brand: ""
  });
  const [listValues, setListValues] = useState<any[]>([]);
  const [insertId, setInsertId] = useState<number | null>(null)

  useEffect(() => {
    // valid brand
    const fetchData = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_BRAND, { withCredentials: true })

        .then(response => {
          setListValues(response.data.tableValues);
        })
        .catch(error => console.log(error))

    }
    fetchData();
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // submit after click button
    handleSubmitPostBrand(form.brand, URLs.POST_WRITE_BRAND, setListValues, setInsertId);
  }

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  return <><Toaster />
    <DivFormularAdmin>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldCars id="brand" label="Marke" onChange={value => handleOnChange('brand', value)} regex={REGEX_NAMES} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Automarken"} </Typography>
      <TableNormal listValues={listValues} insertId={insertId} />
    </DivFormularAdmin>
  </>
};

export default InsertBrand;