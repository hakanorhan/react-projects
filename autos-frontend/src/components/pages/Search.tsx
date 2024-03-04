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



const kmsFrom = [2_500, 5_000, 10_000, 25_000, 35_000, 50_000, 60_000, 85_000, 100_000, 150_000, 250_000, "ab 250000"];

const transmissions = ["Automatik", "Schaltgetriebe"];
const carTypes = ["Cabrio", "Kombi", "Limousine", "Coupe", "Kleinwagen"];
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

  const initalValue: ICarInformationRequest = {
    price: null,
    km: null,
    yearFrom: null,
    yearTo: null,
    brand: null,
    model: null,
    type: null,
    bundesland: null
  }

  // 
  const [carInformation, setCarInformation] = React.useState<ICarInformationRequest>(initalValue);

  // Get once all cars from database at first
  React.useEffect(() => {
    const fetchAllCarsInformations = async () => {
      // Get a value of cars in database
      await axios.get<number>('http://localhost:3001/fastsearchfirst')
          .then(function (response) {
            setCountCars(response.data);
          })
          .catch(err => {
            
          });
      }

      fetchAllCarsInformations();

  }, [])

  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedModel, setSelectedModel] = React.useState<string>("");
  const [selectedKmState, setSelectedKmState] = React.useState<string>("");
  const [selectedTransmissionState, setSelectedTransmissionState] = React.useState<string[]>([]);
  const [selectedPriceState, setSelectedPriceState] = React.useState<string>("");
  const [selectedCarTypeState, setSelectedCarTypeState] = React.useState<string[]>([]);
  const [selectedFederalState, setSelectedFederalState] = React.useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const [maxDate, setMaxDate] = React.useState(dayjs());

  // Getriebe
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

  // Components
  const BrandComponent = () => {

    return <Grid item xs={11} sm={gridWithXS} md={gridWithSM}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Marke</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedBrand}
          label="Marke"
          onChange={handleChangeBrand}
        >
          <MenuItem value={10}>Audi</MenuItem>
          <MenuItem value={20}>BMW</MenuItem>
          <MenuItem value={30}>Mercedes</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  };

  const ModelComponent = () => {
    return <Grid item xs={11} sm={gridWithXS} md={gridWithSM}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedModel}
          label="Marke"
          onChange={handleChangeModel}
        >
          <MenuItem value={10}>Audi</MenuItem>
          <MenuItem value={20}>BMW</MenuItem>
          <MenuItem value={30}>Mercedes</MenuItem>
        </Select>
      </FormControl>
    </Grid>
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

  const KilometerstandComponent = () => {
    return <Grid item xs={gridWithXS}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Kilometerstand bis</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedKmState}
          label="Kilometerstand bis"
          onChange={handleChangeKilometerstand}
        >
          {kmsFrom.map((km) => (
            <MenuItem key={km} value={km}>{km}</MenuItem>))}

        </Select>
      </FormControl>
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

  const GetriebeComponent = () => {
    return <Grid item xs={gridWithXS}>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Getriebe</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTransmissionState}
          onChange={handleChangeGetriebe}
          input={<OutlinedInput label="Getriebe" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {transmissions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedTransmissionState.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  }

  const CarTypeComponent = () => {
    return <Grid  item xs={gridWithXS} md={gridWithSM}>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Fahrzeugtyp</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCarTypeState}
          onChange={handleChangeCarType}
          input={<OutlinedInput label="Fahrzeugtyp" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {carTypes.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedCarTypeState.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
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


  const handleChangeBrand = (event: SelectChangeEvent) => {
    const brand = event.target.value as string;
    setSelectedBrand(brand);
    setCarInformation(prevState => ({
      ...prevState,
      brand: brand
    }))
  };

  const handleChangeModel = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value as string);
  };

  const handleChangeKilometerstand = (event: SelectChangeEvent) => {
    setSelectedKmState(event.target.value);
  };

  const handleChangeGetriebe = (event: SelectChangeEvent<typeof selectedTransmissionState>) => {
    const {
      target: { value },
    } = event;
    setSelectedTransmissionState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
            <BrandComponent />

            {/* Model */}
            <ModelComponent />

            {/* Cartype */}
            <CarTypeComponent />

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
