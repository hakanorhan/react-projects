import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

import TextFieldName from "../../../../formularFields/TextFieldName";

import { SelectChangeEvent, Box, Button, Paper, Typography } from '@mui/material';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { InsertOneProps } from "../../../../../interfaces/componentProps/IPropsInsert";
import { DivFormularAdmin } from "../../../../../themes/ThemeColor";
import SelectField from "../../../../formularFields/SelectField";
import { handleSubmitPostData } from "../../../../../helper/submits";
import { useEffectFetch } from "../../../../../helper/useEffectFetch";

import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";

// Components
const InsertModel:React.FC<{props: InsertOneProps, propsModel: InsertOneProps}> = ({props, propsModel}) => {
    // Fields
    const [selectedBrand, setSelectedBrand] = React.useState<string>("");
    const modelRef = useRef<HTMLInputElement>(null);

    // Fetched data. brand
    const [fetchedBrand, setFetchedBrand] = useState<string[]>([])

    // States
    const [listValues, setListValues] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch Data from database
    useEffectFetch(setLoading, URLs.FETCH_BRAND , setFetchedBrand);

    const handleChangeBrand = (event: SelectChangeEvent) => {
      const brand = event.target.value as string;
      setSelectedBrand(brand);
    };


    const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
      event.preventDefault();


      const model: string | undefined = modelRef.current?.value;
      const value = {
        selectedBrand: selectedBrand,
        model: model
      };

      handleSubmitPostData(value, props, setListValues, setLoading );

    }

  if(loading) {
      return <p>Loading...</p>
  }


    return <>
    <Toaster />
      <DivFormularAdmin>
        <form onSubmit={handleSubmit} noValidate>
            <SelectField values={listValues} selectedValue={selectedBrand} handleChange={handleChangeBrand} />
            <TextFieldName id={propsModel.id} label={propsModel.textFieldlabel} inputRef={modelRef} />
          
          <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
        </form>

      {/* All Brands */}
      <Typography sx={{ textAlign: 'center', marginBottom:'1.5rem' }} variant='h3' component='h1'> {props.tableHeadline} </Typography>
        <TableNormal listValues={listValues}/>
      </DivFormularAdmin>
      </>
  };

  export default InsertModel;