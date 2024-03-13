import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import TextFieldName from "../../../../formularFields/TextFieldName";

import { SelectChangeEvent, Box, Button, Paper, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

/* Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
import TableNormal from "../../../../tables/TableNormal";
import { DivFormularAdmin, DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow } from "../../../../../themes/ThemeColor";
import SelectField from "../../../../formularFields/SelectField";
import { FormDataModel, handleSubmitPostBaureihe } from "../../../../../helper/submits";
import { useEffectFetch, useEffectModel } from "../../../../../helper/DataLoading";

import { URLs } from "../../../../../../../autos-backend/src/enums/URLs";



const gridWithSM = 3.65;
const gridWithXS = 5.5;

// Components
const InsertBaureihe = () => {

  // Fields
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedModel, setSelectedModel] = React.useState<string>("");
  const [selectedFuel, setSelectedFuel] = React.useState<string>("");
  const [selectedCarType, setSelectedCarType] = React.useState<string>("");
  const kWRef = useRef<HTMLInputElement>(null);
  const hubraumRef = useRef<HTMLInputElement>(null);
  const baureiheRef = useRef<HTMLInputElement>(null);


  // Fetched data. brand
  const [fetchedBrand, setFetchedBrand] = useState<string[]>([])
  const [insertId, setInsertId] = useState<number | null>(null)

  // States
  const [listValues, setListValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [listModels, setListModels] = useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const [maxDate, setMaxDate] = React.useState(dayjs());


  // Fetch Data from database
  useEffectFetch(setLoading, URLs.FETCH_BAUREIHE, setListValues);


  // Fetch Model after select value changed
  useEffectModel(setLoading, URLs.FETCH_BAUREIHE_MODEL, setListModels, selectedBrand);


  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
  };

  const handleChangeModel =(event:SelectChangeEvent) => {
    const model = event.target.value as string;
    setSelectedModel(model);
  }

  const handleChangeCarType = (event: SelectChangeEvent) => {
    const carType = event.target.value as string;
    setSelectedCarType(carType);
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const model: string = selectedModel;
    const baureihe: string | undefined = baureiheRef.current?.value;
    const brandId: string = selectedBrand;
    const carTypeId: string = selectedCarType;
    const kW: string | undefined = kWRef.current?.value;
    const hubraum: string | undefined = hubraumRef.current?.value;

    if (model && baureihe && brandId && carTypeId && kW && hubraum) {
      const formDataModl: FormDataModel = {
        model: model,
        baureihe: baureihe,
        brandId: brandId,
        carTypeId: carTypeId,
        kW: kW,
        hubraum: hubraum,
        from: selectedDateFrom?.format('YYYY'),
        to: selectedDateTo?.format('YYYY')
      }
      handleSubmitPostBaureihe(formDataModl, setLoading);
    } else {
    }
  }

  const YearFromComponent: React.FC = () => {
    return <Grid item xs={gridWithXS} md={gridWithSM}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={'Baujahr von'} value={selectedDateFrom} views={['year']} minDate={minDateConst} maxDate={maxDateConst} onChange={(newDate) => { setSelectedDateFrom(newDate), setSelectedDateTo(newDate) }} />

      </LocalizationProvider>
    </Grid>
  }

  const YearToComponent = () => {
    return <Grid item xs={gridWithXS} md={gridWithSM}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={'Baujahr bis'} value={selectedDateTo} views={['year']} minDate={selectedDateFrom} maxDate={maxDate} onChange={(newDate) => { setSelectedDateTo(dayjs(newDate)) }} />
      </LocalizationProvider>
    </Grid>
  }

  console.log(listValues[2])

  if (loading) {
    return <p>Loading...</p>
  }


  return <>
    <Toaster />
    <DivFormularAdmin>
      <form onSubmit={handleSubmit} noValidate>
        <SelectField values={listValues[0]} objectName="brand" idOfSelect="brandid" selectedValue={selectedBrand} handleChange={handleChangeBrand} label="Marke" />
        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <SelectField  values={listModels} objectName="model" idOfSelect="modelid" selectedValue={selectedModel} handleChange={handleChangeModel} label="Modell" />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <TextFieldName id={"baureihe"} label={"Baureihe"} inputRef={baureiheRef} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

            <SelectField values={listValues[1]} objectName="cartype" idOfSelect="cartypeid" selectedValue={selectedCarType} handleChange={handleChangeCarType} label="Typ" />

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <TextFieldName id={"leistung"} label={"Leistung KW"} inputRef={kWRef} />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <TextFieldName id={"hubraum"} label={"Hubraum ccm³"} inputRef={hubraumRef} />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <DivTwoFieldsWithSpaceBetween>
          <DivWidthTwoFieldsRow>
            <YearFromComponent />
          </DivWidthTwoFieldsRow>
          <DivWidthTwoFieldsRow>
            <YearToComponent />
          </DivWidthTwoFieldsRow>
        </DivTwoFieldsWithSpaceBetween>

        <Button fullWidth type='submit' variant="contained" sx={{ marginBottom: '1rem' }}>Hinzufügen</Button>
      </form>

    </DivFormularAdmin>
  </>
};

export default InsertBaureihe;