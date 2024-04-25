import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { MainComponentWidth } from "../../../../../themes/ThemeColor";
import { handleSubmitPostBrand } from "../../../../../helper/submits";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import TextFieldCars from "../../../../formularFields/TextFieldCars";
import { REGEX_NAMES } from "../../../../../../../autos-backend/src/regex/regex";

interface IFormBrand {
  brand: string
};

const formBrand: IFormBrand = {
  brand: ""
}

// Components
const InsertBrand = () => {
  const [form, setForm] = useState( formBrand );
  const [listValues, setListValues] = useState<any[]>([]);
  const [insertId, setInsertId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // valid brand
    const fetchData = async () => {
      await axios.get(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_BRAND, { withCredentials: true })

        .then(response => {
          setListValues(response.data.tableValues);
        })
        .catch(error => {
          console.log(error);
        })

    }
    fetchData();
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRefresh(false);
    // submit after click button
    handleSubmitPostBrand(form.brand, URLs.POST_INSERT_BRAND, setListValues, setInsertId);
  }

  // if user insert new brand. Textfield changes to initialvalue
  useEffect(() => {
    if(listValues.length > 0) {
      setForm( formBrand );
      setRefresh(true);
    }
  }, [listValues])

  const handleOnChange = (fieldName: string, fieldValue: string) => {
    setForm({ ...form, [fieldName]: fieldValue })
  }

  return <><Toaster />
    <MainComponentWidth>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldCars id="brand" label="Marke" onChange={value => handleOnChange('brand', value)} regex={REGEX_NAMES} refresh={ refresh }/>

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Automarken"} </Typography>
      <TableNormal listValues={listValues} insertId={insertId} />
    </MainComponentWidth>
  </>
};

export default InsertBrand;