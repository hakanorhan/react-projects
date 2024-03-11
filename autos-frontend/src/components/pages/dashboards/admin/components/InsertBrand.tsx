import { useState, useRef, useEffect } from "react";

import TextFieldName from "../../../../formularFields/TextFieldName";

import { SelectChangeEvent, Box, Button, Paper, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { InsertOneProps } from "../../../../../interfaces/componentProps/IPropsInsert";
import { DivFormularAdmin } from "../../../../../themes/ThemeColor";
import { handleSubmitPostData } from "../../../../../helper/submits";
import { packageAxiosBrand } from "../../../../../helper/PackageAxios";
import { useEffectFetch } from "../../../../../helper/useEffectFetch";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";

// Components
const InsertOneComponent = ({ props }: { props: InsertOneProps }) => {
  const brandRef = useRef<HTMLInputElement>(null);
  const [listValues, setListValues] = useState<any[]>([]);
  const [insertId, setInsertId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false);

  useEffectFetch(setLoading, URLs.FETCH_BRAND, setListValues);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value: string | undefined = brandRef.current?.value;

    // submit after click button
    handleSubmitPostData(value, props, setListValues, setLoading, setInsertId);
  }

  if (loading) {
    return <p>Loading...</p>
  }
  
  return <><Toaster />
    <DivFormularAdmin>
      <form onSubmit={handleSubmit} noValidate>
        <TextFieldName id={props.id} label={props.textFieldlabel} inputRef={brandRef} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom: '1.5rem' }} variant='h3' component='h1'> {props.tableHeadline} </Typography>
       <TableNormal listValues={listValues} insertId={insertId}/>
    </DivFormularAdmin>
  </>
};

export default InsertOneComponent;

/*
    const [selectedBrand, setSelectedBrand] = useState("");

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };
  */