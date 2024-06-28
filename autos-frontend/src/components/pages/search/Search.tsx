// Bild von <a href="https://pixabay.com/de/users/chulmin1700-15022416/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4886294">철민 박</a> auf <a href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4886294">Pixabay</a>
import { FC, Suspense, lazy, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent, createTheme } from '@mui/material';
import axios from 'axios';
import { COMPONENT_DISTANCE, H1PrimaryMain, SearchContainer, buttonHeight } from '../../../themes/Theme';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import SelectField from '../../formularFields/SelectField';
import { URLs, SelectFieldEnums } from '../../../constants/values';
import { AxiosSearch } from '../../../interfaces/IAxiosData';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { DisplayTypes } from '../../../constants/values';
import { notifyError } from '../../../helper/toastHelper';
import afterComponentViewed from '../../../helper/lazyLoading/afterComponentViewed';
import LoadingComponent from '../../LoadingComponent';

const LazyClickedCarsMost = lazy(() => import('./ClickedCars'));
const LazyClickedCarsElectric = lazy(() => import('./ClickedCars'));

const searchButtonText = " Treffer";

const Search: React.FC = () => {

  const navigate = useNavigate();
  const theme = createTheme();
  // available cars 
  const [countCars, setCountCars] = useState<number>(0);

  const initalValue: AxiosSearch = {
    yearFrom: 0,
    yearTo: 0,
    brand: SelectFieldEnums.ALL_VALUE,
    model: SelectFieldEnums.ALL_VALUE,
    cartype: SelectFieldEnums.ALL_VALUE,
    federal_state: SelectFieldEnums.ALL_VALUE,
    price: SelectFieldEnums.ALL_VALUE
  }

  const [formSelect, setFormSelect] = useState<AxiosSearch>(initalValue);
  const [isClickedCarsVisible, setIsClickedCarsVisible] = useState(false);
  const [isElectricCarVisible, setIsElectricCarVisible] = useState(false);

  const [listBrands, setListBrands] = useState<string[]>([])
  const [listModel, setListModel] = useState<string[]>([]);
  const [listCarTypes, setListCarTypes] = useState<string[]>([]);
  const [listFederalState, setListFederalState] = useState<string[]>([]);
  const [listPrices, setListPrices] = useState<string[]>([]);


  const minDateConst = dayjs('1900');
  const maxDateConst = dayjs();

  // Date
  const [selectedDateFrom, setSelectedDateFrom] = useState<Dayjs | null>();
  const [selectedDateTo, setSelectedDateTo] = useState(selectedDateFrom);
  const maxDate = dayjs();

  // Fetch static data
  useEffect(() => {

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

  useEffect(() => {
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
  useEffect(() => {
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

  const YearFromComponent: FC = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker slotProps={{ textField: { variant: 'standard', } }} label={'Baujahr von'} value={selectedDateFrom} views={['year']} minDate={minDateConst} maxDate={maxDateConst} onChange={(newDate) => { setSelectedDateFrom(newDate), setSelectedDateTo(newDate) }} />

    </LocalizationProvider>
  }

  const YearToComponent = () => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker slotProps={{ textField: { variant: 'standard', } }} label={'Baujahr bis'} value={selectedDateTo} views={['year']} minDate={dayjs()} maxDate={maxDate} onChange={(newDate) => { setSelectedDateTo(dayjs(newDate)) }} />
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

  const SearchContent = () => {

    return (
      <SearchContainer sx={{ padding: '1.5rem', cursor: 'default', backgroundColor: 'background.paper' }}>

        <Grid container sx={{}} justifyContent="center" columnSpacing={3}>
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
                if (countCars > 0)
                  navigateToListSearch();
                else
                  notifyError("no cars", "Zurzeit keine Inserate");
              }}
              sx={{ height: buttonHeight }} fullWidth type='submit' variant="contained" startIcon={<SearchIcon />}>  {countCars} &nbsp;{` ${searchButtonText}`}</Button>
          </Grid>
        </Grid>
      </SearchContainer>)

  }

  useEffect(() => {
    afterComponentViewed(setIsClickedCarsVisible, 'box');
    afterComponentViewed(setIsElectricCarVisible, 'boxElectric');
  }, []); 

  return (<>
  <Box sx={{ backgroundImage: `url("${URLs.ORIGIN_CLIENT}/river-4886294_1280.jpg")` }} height={'59vh'} >
    <div style={{ paddingLeft:'1rem', paddingRight:'1rem' }}>
    <a style={{ fontSize:'0.8rem', color:'whitesmoke' }} target='_blank' href='https://www.pexels.com/de-de/foto/fahrzeug-auf-der-strasse-zur-goldenen-stunde-210182/'>Foto von Pixabay: https://www.pexels.com/de-de/foto/fahrzeug-auf-der-strasse-zur-goldenen-stunde-210182/</a>
    </div>

      <H1PrimaryMain>Neues Auto.</H1PrimaryMain>
      <SearchContent />
    </Box>

      <Box sx={{ minHeight:'500px', marginTop: COMPONENT_DISTANCE }} >

      <h4 style={{ marginLeft:'2.5%', color: theme.palette.primary.main }}>Am meisten gesucht</h4>
            <Suspense fallback={<LoadingComponent />} >
              <LazyClickedCarsMost type={DisplayTypes.MOST_CLICKED} />
            </Suspense>
      </Box>

      <Box
        id="boxElectric"
        sx={{ marginTop: COMPONENT_DISTANCE, minHeight: { xs: '600px', sm: '680px', md: '600px' } }}
      >
      {
        isElectricCarVisible && (<>
          <h4 style={{ marginLeft:'2.5%', color: theme.palette.primary.main }}>Elektroautos</h4>

      
          <Suspense fallback={ <LoadingComponent /> }>
            <LazyClickedCarsElectric type={DisplayTypes.ELECTRIC} />
          </Suspense>
          </>
        )
      }
    </Box> 
  </>
  )
}

export default Search;
