import { useState, useRef, useEffect } from "react";

import TextFieldName from "../../../../formularFields/TextFieldName";

import { SelectChangeEvent, Box, Button, Paper, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { DivFormularAdmin } from "../../../../../themes/ThemeColor";
import { handleSubmitPostBrand } from "../../../../../helper/submits";
import { packageAxiosBrand } from "../../../../../helper/PackageAxios";
import { useEffectFetch } from "../../../../../helper/DataLoading";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";

// Components
const InsertBrand = () => {
  const brandRef = useRef<HTMLInputElement>(null);
  const [listValues, setListValues] = useState<any[]>([]);
  const [insertId, setInsertId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false);

  useEffectFetch(setLoading, URLs.FETCH_BRAND, setListValues);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value: string | undefined = brandRef.current?.value;

    // submit after click button
    handleSubmitPostBrand(value, URLs.POST_WRITE_BRAND, setListValues, setLoading, setInsertId);
  }

  if (loading) {
    return <p>Loading...</p>
  }
  
  return <><Toaster />
    <DivFormularAdmin>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldName id={"marke"} label={"Marke"} inputRef={brandRef} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {"Alle Automarken"} </Typography>
       <TableNormal listValues={listValues} insertId={insertId}/>
    </DivFormularAdmin>
  </>
};

export default InsertBrand;

/*
    const [selectedBrand, setSelectedBrand] = useState("");

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };
  */