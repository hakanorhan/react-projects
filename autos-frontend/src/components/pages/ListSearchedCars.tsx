import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Grid, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { AxiosPaperList } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { notifyError } from '../../helper/toastHelper';
import CarImages from './dashboards/admin/components/CarImages';
import { ShowComponent } from './searchComponents/ShowComponent';
import Pagination from '@mui/material/Pagination';

const LIMIT = 2;

export default function ListSearchedCars() {

  const location = useLocation();

  // count fetched data
  const [anzahlInserates, setAnzahlInserates] = useState<number>(0);

  // 
  const [cars, setCars] = useState<AxiosPaperList[]>();

  const [count, setCount] = useState<number>(0);

  const [offset, setOffset] = useState<number>(0);

  // ----- Pagination ------
  const [page, setPage] = useState<number>(1);
  const handlePagiation = (event: any, value: number) => {
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

  async function fetch() {

    try {

      const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_COUNT, {
        withCredentials: true,
        params: searchParams
      })
      const anzahl = response.data;
      setAnzahlInserates(anzahl);
      
      let countCalculate: number = Math.floor(anzahl / LIMIT);
      countCalculate = (anzahl % LIMIT) > 0 ? countCalculate + 1 : countCalculate;

      setCount(countCalculate);
      setOffset(offset + LIMIT);

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

        const response = await axios.get<AxiosPaperList[]>(URLs.ORIGIN_SERVER + URLs.FETCH_LIST_CARS, {
          withCredentials: true,
          params: { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo, LIMIT, offset  }
        })
        const data = response.data;
        setCars(data);

        setOffset(offset + LIMIT);

      } catch (error) {
        console.log(error)
      }

    }
    
    fetchFromServer();
  }, [ page ])

  const ListContainer: React.FC<{ axiosPaper: AxiosPaperList }> = ({ axiosPaper }) => {
    return <Box sx={{ backgroundColor: 'white', marginBottom: '1rem', padding: '1.5rem' }}>
      {
        cars ? <Box>
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
    <Box sx={{ width: '750px', margin: 'auto', marginTop: '4px' }}>

      {
        cars ? cars.map((axiosPaper) => (
          <ListContainer axiosPaper={axiosPaper} />
        )) : <></>
      }

      <Pagination count={ count } page={ page } onChange={ handlePagiation } />

    </Box>
  )
}
