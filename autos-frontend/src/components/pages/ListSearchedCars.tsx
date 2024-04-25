import React, { useEffect, useState } from 'react'
import { SearchContainer, mainComponentHeight } from '../../themes/ThemeColor'
import { Box, Grid, Paper } from '@mui/material'
import { useLocation, useSearchParams } from 'react-router-dom'
import { AxiosPaper, AxiosPaperList, AxiosSearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { notifyError } from '../../helper/toastHelper';
import { TDescriptionComponent } from './searchComponents/TDescriptionComponent';
import CarImages from './dashboards/admin/components/CarImages';
import { ShowComponent } from './searchComponents/ShowComponent';

export default function ListSearchedCars() {

  const location = useLocation();

  const [cars, setCars] = useState<AxiosPaperList[]>();

  useEffect(() => {

    async function fetch() {

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
          params: { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo }
        })
        const data = response.data;
        setCars(data);

      } catch (error) {
        console.log(error)
      }

    }

    fetch();
  }, [])

  const ListContainer: React.FC<{ axiosPaper: AxiosPaperList }> = ({ axiosPaper }) => {
    return <Box sx={{ backgroundColor:'white', marginBottom:'1rem', padding:'1.5rem' }}>
    {
       cars ? <Box>
        {/* car container */}
      <Grid container columnGap={2}>
      {/* image */}
      <Grid item lg= {3}>
          { cars ? <CarImages id={ axiosPaper.inseratId } /> : <></> }
      </Grid>

      {/* technical description */}
      <Grid item lg={8}>
          {
            cars ? <ShowComponent detailSearchValues={ axiosPaper } /> : <>...loading</>
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
    <Box sx={{ width:'750px', margin:'auto', marginTop: '4px' }}>
      {
        cars ? cars.map((axiosPaper) => (
          <ListContainer axiosPaper={axiosPaper} />
        ))  : <></>
      }
    </Box>
  )
}
