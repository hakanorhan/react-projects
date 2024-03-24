import * as React from 'react'
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { SearchContainer, primaryColorMain } from '../../themes/ThemeColor';
import { IResponseSearch } from '../../../../autos-backend/src/interfaces/search/IResponseSearch';
import { ICarInformationRequest } from '../../../../autos-backend/src/interfaces/search/IRequestSearch';

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

const prices = [500, 1_000, 2_500, 5_000, 7_500, 10_000, 15_000, 20_000, 30_000, 40_000, 50_000, 60_000, 70_000, 80_000, 90_000, 100_000, 200_000, "ab 200000"];
const federalStates = ["Berlin", "Brandenburg", "Mecklenburg-Vorpommern", "Nordrhein-Westfalen"];

const gridWithSM = 3.65;
const gridWithXS = 5.5;

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

  // Get once all cars from database at first
  React.useEffect(() => {
    const fetchAllCarsInformations = async () => {
      // Get a value of cars in database
      await axios.get<number>(`${URLs.ORIGIN_SERVER}${URLs.ALL_FAST_SEARCH_FIRST}`)
          .then(function (response) {
            setCountCars(response.data);
            
            CONSOLE_DEV(response.data);
          })
          .catch(err => {
            
          });
      }

      fetchAllCarsInformations();

  }, [])

  const [selectedPriceState, setSelectedPriceState] = React.useState<string>("");
  const [selectedCarTypeState, setSelectedCarTypeState] = React.useState<string[]>([]);
  const [selectedFederalState, setSelectedFederalState] = React.useState<string[]>([]);

  const [listBrands, setListBrands] = React.useState<string[]>([])
  const [listModel, setListModel] = React.useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = React.useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const [maxDate, setMaxDate] = React.useState(dayjs());

  useEffectFetch(URLs.FETCH_BRAND, setListBrands);
  useEffectModel(URLs.FETCH_BAUREIHE_MODEL, setListModel, formSelect.brand);

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

  const PreiseBisComponent = () => {
    return <Grid item xs={gridWithXS} md={gridWithSM}>
      <FormControl>
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
    </Grid>
  }

  const FederalStateComponent = () => {
    return <Grid item xs={11} sm={gridWithXS} md={gridWithSM}>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Bundesland</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedFederalState}
          onChange={handleChangeFederalState}
          input={<OutlinedInput label="Bundesland" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {federalStates.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedFederalState.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  }

  const handleChangePreisBis = (event: SelectChangeEvent) => {
    setSelectedPriceState(event.target.value);
  };

  const handleChangeCarType = (event: SelectChangeEvent<typeof selectedCarTypeState>) => {
    const {
      target: { value },
    } = event;
    setSelectedCarTypeState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeFederalState = (event: SelectChangeEvent<typeof selectedFederalState>) => {
    const {
      target: { value },
    } = event;
    setSelectedFederalState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <Box >
        <h1 style={{ textAlign: 'center', color: primaryColorMain, paddingTop: '4rem' }}>Find your next car.</h1>
        <SearchContainer>
          <Grid container justifyContent="center" columnSpacing={1}>

            {/* Brand */}
            <SelectField values={listBrands} selectedValue={formSelect.brand} objectName='brand' idOfSelect='brandid' handleChange={handleChangeSelect} label='Marke'/>

            {/* Model */}
            <SelectField values={listModel} selectedValue={formSelect.model} objectName='model' idOfSelect='modelid' handleChange={handleChangeSelect} label='Modell' />

            {/* Cartype */}
            <SelectField idOfSelect='cartypeid' objectName='cartype' handleChange={handleChangeSelect} label='Fahrzeugtyp' values={listCarTypes} selectedValue={formSelect.cartype} />

            {/* Preis */}
            <PreiseBisComponent />

            {/* Year from */}
            <YearFromComponent />

            {/* Year to */}
            <YearToComponent />

            {/* Federal State */}
            <FederalStateComponent />
            
            <Grid item xs={11} sm={gridWithXS} md={7.3}>
              <Button fullWidth type='submit' variant="contained"><SearchIcon />  <Number n={countCars} /> { ` ${searchButtonText}` }</Button>
            </Grid>
          </Grid>
        </SearchContainer>
      </Box>

    </>
  )
}

export default Search;
