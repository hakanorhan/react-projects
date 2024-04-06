import * as React from 'react'
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { SearchContainer, primaryColorMain } from '../../themes/ThemeColor';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { useSpring, animated } from 'react-spring';
import SelectField from '../formularFields/SelectField';
import { useEffectFetch, useEffectModel } from '../../helper/DataLoading';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import { AxiosSearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { CONSOLE_DEV } from '../../helper/helper';
import { AuthResponse } from '../../../../autos-backend/src/interfaces/auth/AuthResponse';
import { useDispatch } from 'react-redux';
import { setRole, setWhichButtonClicked } from '../../redux/features/userlogged';
import { Roles } from '../../../../autos-backend/src/enums/Roles';

const prices = [500, 1_000, 2_500, 5_000, 7_500, 10_000, 15_000, 20_000, 30_000, 40_000, 50_000, 60_000, 70_000, 80_000, 90_000, 100_000, 200_000, "ab 200000"];

const searchButtonText = " Treffer";

const Search: React.FC = () => {

const Number = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass:1, tension: 20, friction: 10 }
  });
  return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
}

  // available cars 
  const [countCars, setCountCars] = React.useState<number>();

  const initalValue: AxiosSearch = {
    price: 0,
    yearFrom: 0,
    yearTo: 0,
    brand: "",
    model: "",
    cartype: "",
    bundesland: ""
  }

  const [formSelect, setFormSelect] = React.useState<AxiosSearch>(initalValue);


  const [selectedPriceState, setSelectedPriceState] = React.useState<string>("");
  const [selectedCarTypeState, setSelectedCarTypeState] = React.useState<string[]>([]);

  const [listBrands, setListBrands] = React.useState<string[]>([])
  const [listModel, setListModel] = React.useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = React.useState<string[]>([]);
  const [listFederalState, setListFederalState] = React.useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const [maxDate, setMaxDate] = React.useState(dayjs());

  // Fetch static data for select fields
  useEffectFetch(URLs.FETCH_BRAND, setListBrands);
  useEffectModel(URLs.FETCH_BAUREIHE_MODEL, setListModel, formSelect.brand);
  
  // Fetch static data
  React.useEffect(() => {
    async function fetchData() {
      try { 
        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_STATIC_DATA, { withCredentials: true })

        if(response.data) {
          const tableValues = response.data.tableValues;
          setListFederalState(tableValues.resultBundesland);
          setListCarTypes(tableValues.resultCarTypes);
        }
      } catch(error) {

      }
    }

    fetchData();
  }, [])

  /*
  React.useEffect(() => {
    async function fetchData() {
      try { 
        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_BUNDESLAENDER, { withCredentials: true })

        if(response.data) {
          const tableValues = response.data.tableValues;
          setListFederalState(tableValues);
        }
      } catch(error) {

      }
    }

    fetchData();
  }, []) */

  // fetch data on every select field changes
  React.useEffect(() => {
    handleDynamicSearch();
  }, [formSelect, selectedDateFrom, selectedDateTo])

  // dynamic search
  const handleDynamicSearch =async () => {

    const brandId = formSelect.brand;
    const modelId = formSelect.model;
    const price = formSelect.price;
    const carTypeId = formSelect.cartype;
    const blandId = formSelect.bundesland;
    const dateFrom = selectedDateFrom;
    const dateTo = selectedDateTo;
    
    const searchParams = { brandId, modelId, price, carTypeId, blandId, dateFrom, dateTo };

    try {
      const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_DYNAMIC_SEARCH, { 
        withCredentials: true,
         params: searchParams
        })
        alert(response.data);
         setCountCars(response.data);
    } catch(error) {
      console.error('Error searching', error);
    }
  }

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormSelect(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));

  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  const YearFromComponent: React.FC = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={'Baujahr von'} value={selectedDateFrom} views={['year']} minDate={minDateConst} maxDate={maxDateConst} onChange={(newDate) => { setSelectedDateFrom(newDate), setSelectedDateTo(newDate) }} />
        
      </LocalizationProvider>
  }

  const YearToComponent = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={'Baujahr bis'} value={selectedDateTo} views={['year']} minDate={selectedDateFrom} maxDate={maxDate} onChange={(newDate) => { setSelectedDateTo(dayjs(newDate)) }} />
      </LocalizationProvider>
  }

  const PreiseBisComponent = () => {
    return <FormControl>
        <InputLabel id="demo-simple-select-label">Preis bis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPriceState}
          label="Preis bis"
          onChange={handleChangePreisBis}
        >
          {prices.map(preis => (<MenuItem key={preis} value={preis}>{preis + "€"}</MenuItem>))}

        </Select>
      </FormControl>
  }


  const handleChangePreisBis = (event: SelectChangeEvent) => {
    setSelectedPriceState(event.target.value);
  };

  return (
    <>
      <Box >
        <h1 style={{ textAlign: 'center', color: primaryColorMain, paddingTop: '4rem' }}>Find your next car.</h1>
        <SearchContainer>
          <Grid container justifyContent="center" columnSpacing={1}>
            <Grid item xs= {6} md={4}>
            {/* Brand */}
            <SelectField values={listBrands} selectedValue={formSelect.brand} objectName='brand' idOfSelect='brandid' handleChange={handleChangeSelect} label='Marke'/>
            </Grid>
            <Grid item xs={6} md={4}>
            {/* Model */}
            <SelectField values={listModel} selectedValue={formSelect.model} objectName='model' idOfSelect='modelid' handleChange={handleChangeSelect} label='Modell' />
            </Grid>

            <Grid item xs={6} md={4}>
            {/* Cartype */}
            <SelectField idOfSelect='cartypeid' objectName='cartype' handleChange={handleChangeSelect} label='Fahrzeugtyp' values={listCarTypes} selectedValue={formSelect.cartype} />
            </Grid>

            <Grid item xs={6} md={4}>
            {/* Preis */}
            <PreiseBisComponent />
            </Grid>

            <Grid item xs={6} md={4}>
            {/* Year from */}
            <YearFromComponent />
            </Grid>

            <Grid item xs={6} md={4}>
            {/* Year to */}
            <YearToComponent />
            </Grid>

            <Grid item xs={6} md={4}>
              <SelectField idOfSelect='blandid' objectName='bundesland' handleChange={handleChangeSelect} label='Bundesland' values={listFederalState} selectedValue={formSelect.bundesland} />
            </Grid>

            <Grid item xs={6} md={8}>
              <Button fullWidth type='submit' variant="contained"><SearchIcon />  <Number n={countCars} /> { ` ${searchButtonText}` }</Button>
            </Grid>
          </Grid>
        </SearchContainer>
      </Box>

    </>
  )
}

export default Search;
