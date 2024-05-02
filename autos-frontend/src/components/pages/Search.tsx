import * as React from 'react'
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { SearchContainer, buttonHeight, mainComponentHeight, primaryColorMain } from '../../themes/ThemeColor';

import SearchIcon from '@mui/icons-material/Search';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSpring, animated } from 'react-spring';
import SelectField from '../formularFields/SelectField';
import { useEffectFetch, useEffectModel } from '../../helper/DataLoading';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import { AxiosSearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { SelectFieldEnums } from '../../../../autos-backend/src/enums/SelectFieldEnums';
import { createSearchParams, useNavigate } from 'react-router-dom';

const searchButtonText = " Treffer";

const Search: React.FC = () => {

  const navigate = useNavigate();

  const Number = ({ n }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 }
    });
    return <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
  }

  // available cars 
  const [countCars, setCountCars] = React.useState<number>();

  const initalValue: AxiosSearch = {
    yearFrom: 0,
    yearTo: 0,
    brand: SelectFieldEnums.ALL_VALUE,
    model: SelectFieldEnums.ALL_VALUE,
    cartype: SelectFieldEnums.ALL_VALUE,
    federal_state: SelectFieldEnums.ALL_VALUE,
    price: SelectFieldEnums.ALL_VALUE
  }

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
  const [maxDate, setMaxDate] = React.useState(dayjs());

  // Fetch static data for select fields
  useEffectFetch(URLs.FETCH_BRAND, setListBrands);
  useEffectModel(URLs.FETCH_MODEL, setListModel, formSelect.brand);

  // Fetch static data
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_STATIC_DATA, { withCredentials: true })
        if (response.data) {

          const tableValues = response.data.tableValues;

          setListFederalState(tableValues.resultBundesland);
          setListCarTypes(tableValues.resultCarTypes);
          setListPrices(tableValues.resultPrices);
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
    return () => {}
  }, [])

  // fetch data on every select field changes, count cars
  React.useEffect(() => {
    handleDynamicSearch();
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
    } catch (error) {
      console.error('Error searching', error);
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

  return (
    <>
      <Box sx={{ height: mainComponentHeight }}>
        <h1 style={{ textAlign: 'center', color: primaryColorMain, paddingTop: '4rem' }}>Find your next car.</h1>
        <SearchContainer>
          <Grid container justifyContent="center" columnSpacing={1}>
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
                  const brandid = formSelect.brand;
                  const modelid = formSelect.model;
                  const price = formSelect.price;
                  const cartypeid = formSelect.cartype;
                  const dateFrom = selectedDateFrom === undefined || selectedDateFrom === null ? SelectFieldEnums.ALL_VALUE : selectedDateFrom.year().toString();
                  const dateTo = selectedDateTo  === undefined || selectedDateTo === null ? SelectFieldEnums.ALL_VALUE : selectedDateTo.year().toString();
                  const blandid = formSelect.federal_state;

                  navigate({
                    pathname: URLs.FETCH_LIST_CARS,
                    search: createSearchParams({
                      brandid, modelid, cartypeid, price,  blandid, dateFrom, dateTo
                    }).toString()
                  });
                }}
                sx={{ height: buttonHeight }} fullWidth type='submit' variant="contained"><SearchIcon />  <Number n={countCars} /> {` ${searchButtonText}`}</Button>
            </Grid>
          </Grid>
        </SearchContainer>
      </Box>

    </>
  )
}

export default Search;
