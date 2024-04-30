import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosPaperList } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { notifyError } from '../../helper/toastHelper';
import CarImages from './dashboards/admin/components/CarImages';
import { ShowComponent } from './searchComponents/ShowComponent';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortEnums } from '../../../../autos-backend/src/enums/SortEnums';

const LIMIT = 5;

export default function ListSearchedCars() {

  const location = useLocation();

  const navigate = useNavigate();

  // 
  const [cars, setCars] = useState<AxiosPaperList[]>();

  const [count, setCount] = useState<number>(0);

  const [offset, setOffset] = useState<number>(0);

  // sort
  const [selectedSort, setSelectedSort] = useState<string>(SortEnums.PRICE_DOWN);

  // ----- Pagination ------
  const [page, setPage] = useState<number>(1);
  const handlePagiation = (event: any, value: number) => {
    const offsetTemp: number = LIMIT * (value - 1);
    setOffset(offsetTemp);
    setPage(value);
  } ;

  // count
useEffect(() => {

  const urlSearchParams = new URLSearchParams(location.search);
  const brandid = urlSearchParams.get('brandid');
  const modelid = urlSearchParams.get('modelid');
  const cartypeid = urlSearchParams.get('cartypeid');
  const blandid = urlSearchParams.get('blandid');
  const dateFrom = urlSearchParams.get('dateFrom');
  const dateTo = urlSearchParams.get('dateTo');
  const price = urlSearchParams.get('price');

  const searchParams = { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo };

  // 
  async function fetch() {

    try {

      const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_COUNT, {
        withCredentials: true,
        params: searchParams
      })
      const anzahl = response.data;
      
      let countCalculate: number = Math.floor(anzahl / LIMIT);
      countCalculate = (anzahl % LIMIT) > 0 ? countCalculate + 1 : countCalculate;

      setCount(countCalculate);

    } catch (error) {
      console.log(error)
    }
  }
  fetch();
}, [])

  useEffect(() => {
    
    async function fetchFromServer () {
      try {
        const searchParams = new URLSearchParams(location.search);
        const brandid = searchParams.get('brandid');
        const modelid = searchParams.get('modelid');
        const cartypeid = searchParams.get('cartypeid');
        const blandid = searchParams.get('blandid');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const price = searchParams.get('price');
        const sorttype = selectedSort;

        const response = await axios.get<AxiosPaperList[]>(URLs.ORIGIN_SERVER + URLs.FETCH_LIST_CARS, {
          withCredentials: true,
          params: { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo, LIMIT, offset, sorttype  }
        })
        const data = response.data;
        setCars(data);

      } catch (error) {
        console.log(error)
      }

    }
    
    fetchFromServer();
  }, [ page, selectedSort ])

   const handleChangeSort = (event: SelectChangeEvent) => {
    const sortId = event.target.value as string;
    setSelectedSort(sortId);
  };

  const handleShowDetail = ({ id }: ({id: number})) => {
    navigate(URLs.FETCH_DETAIL_SEARCH + `/${ id }`);
  }

  const ListContainer: React.FC<{ axiosPaper: AxiosPaperList }> = ({ axiosPaper }) => {
    return <Box sx={{ backgroundColor: 'white', marginBottom: '1rem', padding: '1.5rem' }}>
      {
        cars ? <Box sx={{ '&:hover': { cursor: 'pointer' } }} onClick={ () => { handleShowDetail( {id:  axiosPaper.inseratId} ) } } >
          {/* car container */}
          <Grid container columnGap={2}>
            {/* image */}
            <Grid item lg={3}>
              {cars ? <CarImages id={axiosPaper.inseratId} /> : <></>}
            </Grid>

            {/* technical description */}
            <Grid item lg={8}>
              {
                cars ? <ShowComponent detailSearchValues={axiosPaper} /> : <>...loading</>
              }

            </Grid>

          </Grid>
          < hr />
        </Box>
          : <></>
      }
    </Box>
  }

  return (
    <Box sx={{ width: '750px', margin: 'auto', marginTop: '40px' }}>
      
      <FormControl sx={{ width:'200px',  }}>
        <InputLabel id="sort">Sortieren</InputLabel>
        <Select
          labelId='sort'
          value={ selectedSort }
          label={"Sortieren"}
          onChange={ handleChangeSort }
          >
            <MenuItem value={ SortEnums.EZ_UP }>Erstzulassung <ArrowUpwardIcon fontSize='small'/></MenuItem>
            <MenuItem value={ SortEnums.EZ_DOWN }>Erstzulassung <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={ SortEnums.KM_UP }>Kilometerstand <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={ SortEnums.KM_DOWN }>Kilometerstand <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={ SortEnums.INSREATE_UP }>Inserate <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={ SortEnums.INSREATE_DOWN }>Inserate <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr/>
            <MenuItem value={ SortEnums.POWER_UP }>Leistung <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={ SortEnums.POWER_DOWN }>Leistung <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={ SortEnums.PRICE_UP }>Preis <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={ SortEnums.PRICE_DOWN }>Preis <ArrowDownwardIcon fontSize='small' /></MenuItem>

          </Select>
          
      </FormControl>

      {
        cars ? cars.map((axiosPaper, index) => (
          <ListContainer key={index} axiosPaper={axiosPaper} />
        )) : <CircularProgress />
      }

      <Pagination count={ count } page={ page } onChange={ handlePagiation } />

    </Box>
  )
}
