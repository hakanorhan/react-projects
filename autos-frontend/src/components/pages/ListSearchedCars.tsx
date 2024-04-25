import React, { useEffect, useState } from 'react'
import { SearchContainer, mainComponentHeight } from '../../themes/ThemeColor'
import { Paper } from '@mui/material'
import { useLocation, useSearchParams } from 'react-router-dom'
import { AxiosSearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { notifyError } from '../../helper/toastHelper';

export default function ListSearchedCars() {

  const location = useLocation();

  const [cars, setCars]: any[] = useState([]);

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

        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_LIST_CARS, {
          withCredentials: true,
          params: { brandid, modelid, price,  cartypeid, blandid, dateFrom, dateTo }
        })
        const data = response.data;
        setCars(data);


      } catch(error) {
        console.log(error)
      }
      
    } 

    fetch();
  }, [])

  
  return (
    <SearchContainer sx={{ marginTop:'4px', height: mainComponentHeight }}>
      <Paper >
        <p> { cars[0] } </p>
      </Paper>
    </SearchContainer>
  )
}
