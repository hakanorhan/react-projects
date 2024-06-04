import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, CardActionArea, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosPaperList, AxiosRejectPackage } from '../../../interfaces/IAxiosData';
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import CarImages from './CarImages';
import { ShowFastPaper } from './searchComponents/ShowFastPaper';
import { COMPONENT_DISTANCE, ZOOM_HOVER } from '../../../themes/Theme';
import { DisplayTypes } from '../../../enums/DisplayTypes';
import AddIcon from '@mui/icons-material/Add';
import LimitMediaQuery from '../../../helper/LimitMediaQuery';
import { notifyError, notifySuccess } from '../../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';

const SearchedCars: React.FC<{ type: DisplayTypes }> = ({ type }) => {

  const LIMIT = LimitMediaQuery();

  const navigate = useNavigate();

  const [cars, setCars] = useState<AxiosPaperList[]>([]);

  const [offset, setOffset] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  async function fetchFromServer() {
    try {
      const limit = LIMIT;
      const response = await axios.post<AxiosPaperList[]>(URLs.ORIGIN_SERVER + URLs.FETCH_CLICKED_CARS, { offset, limit, type }, {
        withCredentials: true,
      })
      const data: AxiosPaperList[] = response.data;
      if(data.length > 0) {
        setCars(prevCars => [...prevCars, ...data]);
        setOffset(offset + data.length);
      }

    } catch (error) {
      console.log(error)
    }

  }

  async function fetchCountFromServer() {
    try {
      const response = await axios.post(URLs.ORIGIN_SERVER + URLs.FETCH_CLICKED_CARS_COUNT, { type }, {
        withCredentials: true,
      })
      const data = response.data;
      setCount(data);

    } catch (error: any) {
      const axiosRejectPackage: AxiosRejectPackage = error.response.data;
      notifyError(axiosRejectPackage.messageId, axiosRejectPackage.message);
    }

  }

  const handleShowNewCars = (_event: any) => {
    if (offset <= cars.length) {
      fetchFromServer();
    }
      
  };

  useEffect(() => {
    fetchCountFromServer();
    fetchFromServer();
  }, [])

  const handleShowDetail = ({ id }: ({ id: number })) => {
    navigate(URLs.FETCH_DETAIL_SEARCH + `/${id}`);
  }
  const MemoizedContainer = useMemo(() => {
    return ({ axiosPaper }: { axiosPaper : AxiosPaperList}) => {
    
      return <>{<Card elevation={1} sx={ ZOOM_HOVER }
        onClick={() => { handleShowDetail({ id: axiosPaper.inseratId }) }}>
        <CardActionArea>
  
          <CarImages id={axiosPaper.inseratId} multiple={false} />
  
          {/* technical description */}
          <ShowFastPaper detailSearchValues={axiosPaper} />
  
        </CardActionArea>
      </Card>}</>
    }
  }, [])

  return (<>
  <Toaster />
    { cars && cars?.length > 0 &&
    <Box sx={{ display:'block', width: '95%', margin: 'auto', paddingTop: '20px', marginBottom: COMPONENT_DISTANCE }}>

      <Grid container spacing={4}>
        {
          cars && cars.map((axiosPaper, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <MemoizedContainer key={index} axiosPaper={axiosPaper} />
            </Grid>
          )) 
        }
      </Grid>

      <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: COMPONENT_DISTANCE }}>
      <Button disabled={ offset >= count } onClick={  handleShowNewCars } sx={{ width:'250px', color: 'text.primary', '&:hover': { backgroundColor:'transparent' } }} startIcon={<AddIcon />} >Weitere Anzeigen</Button>
      </Box>
    </Box>
}
        </>
  )
}

export default SearchedCars;
