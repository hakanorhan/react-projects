import * as React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { 
  SearchContainer,
  buttonHeight,
  headerSize 
} from '../../../themes/Theme';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSpring, animated } from 'react-spring';
import SelectField from '../../formularFields/SelectField';
import { URLs } from '../../../enums/URLs';
import { AxiosSearch } from '../../../interfaces/IAxiosData';
import { SelectFieldEnums } from '../../../enums/SelectFieldEnums';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import ClickedCars from './ClickedCars';
import { DisplayTypes } from '../../../enums/DisplayTypes';
import { notifyError } from '../../../helper/toastHelper';

const searchButtonText = " Treffer";

interface NumberProps {
  n: number | undefined
}

const Search: React.FC = () => {

  const navigate = useNavigate();

  const Number: React.FC<NumberProps> = ({ n }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 }
    });
    return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
  }

  // available cars 
  const [countCars, setCountCars] = React.useState<number>(0);

  const initalValue: AxiosSearch = {
    yearFrom: 0,
    yearTo: 0,
    brand: SelectFieldEnums.ALL_VALUE,
    model: SelectFieldEnums.ALL_VALUE,
    cartype: SelectFieldEnums.ALL_VALUE,
    federal_state: SelectFieldEnums.ALL_VALUE,
    price: SelectFieldEnums.ALL_VALUE
  }

  const isXS = useMediaQuery('(max-width:570px)');
  const isSM = useMediaQuery('(max-width:768px)');
  const isMD = useMediaQuery('(max-width:1100px)');

  const [formSelect, setFormSelect] = React.useState<AxiosSearch>(initalValue);

  const [listBrands, setListBrands] = React.useState<string[]>([])
  const [listModel, setListModel] = React.useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = React.useState<string[]>([]);
  const [listFederalState, setListFederalState] = React.useState<string[]>([]);
  const [listPrices, setListPrices] = React.useState<string[]>([]);

  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = React.useState(selectedDateFrom);
  const maxDate = dayjs();

  // Fetch static data
  React.useEffect(() => {

    async function fetchData() {

      try {
        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.SEARCH_DATAS, { withCredentials: true })
        if (response.data) {

          const tableValues = response.data.tableValues;
          setListBrands(tableValues.resultBrands);
          setListFederalState(tableValues.resultBundesland);
          setListCarTypes(tableValues.resultCarTypes);
          setListPrices(tableValues.resultPrices);
        }
      } catch (error: any) {
        notifyError(error.response.data.messageId, error.response.data.message);
      }
    }

    fetchData();
    return () => { }
  }, [])

  React.useEffect(() => {
    const selectedBrand = formSelect.brand;
    const fetchData = async () => {
      await axios.post(URLs.ORIGIN_SERVER + URLs.FETCH_MODEL, { selectedBrand }, { withCredentials: true })

        .then(response => {

          setListModel(response.data.tableValues);
        })
        .catch(error => notifyError(error.response.messageId, error.response.data.message))
    }
    if (selectedBrand) fetchData();
    return () => { }
  }, [formSelect.brand])

  // fetch data on every select field changes, count cars
  React.useEffect(() => {
    handleDynamicSearch();
    return () => { }
  }, [formSelect, selectedDateFrom, selectedDateTo])

  // dynamic search
  const handleDynamicSearch = async () => {

    const brandid = formSelect.brand === "" ? SelectFieldEnums.ALL_VALUE : formSelect.brand;
    const modelid = formSelect.model === "" ? SelectFieldEnums.ALL_VALUE : formSelect.model;
    const price = formSelect.price === "" ? SelectFieldEnums.ALL_VALUE : formSelect.price;
    const cartypeid = formSelect.cartype === "" ? SelectFieldEnums.ALL_VALUE : formSelect.cartype;
    const blandid = formSelect.federal_state === "" ? SelectFieldEnums.ALL_VALUE : formSelect.federal_state;
    const dateFrom = selectedDateFrom?.year() === null ? SelectFieldEnums.ALL_VALUE : selectedDateFrom?.year();
    const dateTo = selectedDateTo?.year() === null ? SelectFieldEnums.ALL_VALUE : selectedDateTo?.year();

    const searchParams = { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo };

    try {
      const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_COUNT, {
        withCredentials: true,
        params: searchParams
      })
      setCountCars(response.data);
    } catch (error: any) {
      notifyError(error.response.data.messageId, error.response.data.message);
    }
  }

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    setFormSelect(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));

    if (event.target.name === "brand") {
      setFormSelect(prevState => ({
        ...prevState,
        ["model"]: SelectFieldEnums.ALL_VALUE
      }));
    }

  }

  const YearFromComponent: React.FC = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker slotProps={{ textField: { variant: 'standard', } }} label={'Baujahr von'} value={selectedDateFrom} views={['year']} minDate={minDateConst} maxDate={maxDateConst} onChange={(newDate) => { setSelectedDateFrom(newDate), setSelectedDateTo(newDate) }} />

    </LocalizationProvider>
  }

  const YearToComponent = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker slotProps={{ textField: { variant: 'standard', } }} label={'Baujahr bis'} value={selectedDateTo} views={['year']} minDate={selectedDateFrom} maxDate={maxDate} onChange={(newDate) => { setSelectedDateTo(dayjs(newDate)) }} />
    </LocalizationProvider>
  }

  const navigateToListSearch = () => {

    const brandid = formSelect.brand;
                  const modelid = formSelect.model;
                  const price = formSelect.price;
                  const cartypeid = formSelect.cartype;
                  const dateFrom = selectedDateFrom === undefined || selectedDateFrom === null ? SelectFieldEnums.ALL_VALUE : selectedDateFrom.year().toString();
                  const dateTo = selectedDateTo === undefined || selectedDateTo === null ? SelectFieldEnums.ALL_VALUE : selectedDateTo.year().toString();
                  const blandid = formSelect.federal_state;

                  navigate({
                    pathname: URLs.FETCH_LIST_CARS,
                    search: createSearchParams({
                      brandid, modelid, cartypeid, price, blandid, dateFrom, dateTo
                    }).toString()
                  });

  }

  return (
    <Box>
      <Box sx={{ backgroundImage: 'url("pexels-shkrabaanthony-7144243.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>

        <Typography variant={isXS ? 'h3' : isSM ? 'h5' : isMD ? 'h4' : 'h2'} component='h1' sx={headerSize}>Neues Auto.</Typography>
        <SearchContainer onClick={(e) => e.stopPropagation()} sx={{ padding: '1.5rem', cursor: 'default', backgroundColor: 'background.default' }}>
          
          <Grid container sx={{}} justifyContent="center" columnSpacing={1}>
            <Grid item xs={6} md={4}>
              {/* Brand */}
              <SelectField values={listBrands} selectedValue={formSelect.brand} objectName='brand' idOfSelect='brand_id' handleChange={handleChangeSelect} label='Marke' allOption={true} />
            </Grid>
            <Grid item xs={6} md={4}>
              {/* Model */}
              <SelectField values={listModel} selectedValue={formSelect.model} objectName='model' idOfSelect='model_id' handleChange={handleChangeSelect} label='Modell' allOption={true} />
            </Grid>

            <Grid item xs={6} md={4}>
              {/* Cartype */}
              <SelectField idOfSelect='cartype_id' objectName='cartype' handleChange={handleChangeSelect} label='Fahrzeugtyp' values={listCarTypes} selectedValue={formSelect.cartype} allOption={true} />
            </Grid>

            <Grid item xs={6} md={4}>
              {/* Preis */}
              <SelectField idOfSelect='price' objectName='price' handleChange={handleChangeSelect} label='Preis' values={listPrices} selectedValue={formSelect.price} allOption={true} />
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
              <SelectField idOfSelect='federal_state_id' objectName='federal_state' handleChange={handleChangeSelect} label='Bundesland' values={listFederalState} selectedValue={formSelect.federal_state} allOption={true} />
            </Grid>

            <Grid item xs={6} md={8}>
              <Button
                onClick={() => { 
                  if(countCars > 0)
                    navigateToListSearch();
                  else
                    notifyError("no cars", "Zurzeit keine Inserate");
                }}
                sx={{ height: buttonHeight }} fullWidth type='submit' variant="contained" startIcon={<SearchIcon />}>  <Number n={countCars} /> &nbsp;{` ${searchButtonText}`}</Button>
            </Grid>
          </Grid>
        </SearchContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '2rem' }}>
          <a style={{ paddingRight: '1rem' }} href='https://www.pexels.com/de-de/foto/mann-frau-auto-fahrzeug-7144243/' target='_blank'>
            <Typography sx={{ color: 'white' }}>pexels - Foto von Antoni Shkraba:</Typography> </a>
        </Box>


      </Box>
      
      <Box sx={{ minHeight: {xs: '600px', sm: '680px', md: '600px'} }}>
      <ClickedCars type={DisplayTypes.MOST_CLICKED} />
      <ClickedCars type={DisplayTypes.ELECTRIC} />
      </Box>

    </Box>
  )
}

export default Search;
