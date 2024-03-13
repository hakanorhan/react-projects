import { useState, useRef, useEffect } from "react";

import TextFieldName from "../../../../formularFields/TextFieldName";

import { SelectChangeEvent, Box, Button, Paper, Typography } from '@mui/material';

/* Hot Toast */
import { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { DivFormularAdmin } from "../../../../../themes/ThemeColor";
import { handleSubmitPostBrand, handleSubmitPostModel } from "../../../../../helper/submits";
import { packageAxiosBrand } from "../../../../../helper/PackageAxios";
import { useEffectFetch } from "../../../../../helper/DataLoading";
import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";
import SelectField from "../../../../formularFields/SelectField";

// Components
const InsertModel = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const modelRef = useRef<HTMLInputElement>(null);
  const [listValues, setListValues] = useState<any[]>([]);
  const [insertId, setInsertId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false);

  useEffectFetch(setLoading, URLs.FETCH_BRAND, setListValues);

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const model: string | undefined = modelRef.current?.value;
    const brandId: string = selectedBrand;
    // submit after click button
    handleSubmitPostModel({ brandId, model }, URLs.POST_WRITE_MODEL, setLoading);
  }

  if (loading) {
    return <p>Loading...</p>
  }
  
  return <><Toaster />
    <DivFormularAdmin>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={listValues} objectName="brand" idOfSelect="brandid" selectedValue={selectedBrand} handleChange={handleChangeBrand} label="Marke"/>
        <TextFieldName id={"model"} label={"Modell"} inputRef={modelRef} />

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

    </DivFormularAdmin>
  </>
};

export default InsertModel;

/*
    const [selectedBrand, setSelectedBrand] = useState("");

  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };
  */