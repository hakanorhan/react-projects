import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, CardActionArea, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosPaperList } from '../../../interfaces/IAxiosData';
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import CarImages from './CarImages';
import { ShowFastPaper } from './searchComponents/ShowFastPaper';
import { COMPONENT_DISTANCE, ZOOM_HOVER } from '../../../themes/Theme';
import { DisplayTypes } from '../../../enums/DisplayTypes';
import AddIcon from '@mui/icons-material/Add';
import SkeletonCard from '../skeleton/SkeletonCard';

const LIMIT = 1;

const SearchedCars: React.FC<{ type: DisplayTypes }> = ({ type }) => {

  const navigate = useNavigate();

  const [cars, setCars] = useState<AxiosPaperList[]>([]);

  const [offset, setOffset] = useState<number>(0);

  const handleShowNewCars = (_event: any) => {
    setOffset(offset + LIMIT);
  };

  useEffect(() => {
    async function fetchFromServer() {
      try {
        const limit = LIMIT;
        const response = await axios.post<AxiosPaperList[]>(URLs.ORIGIN_SERVER + URLs.FETCH_CLICKED_CARS, { offset, limit, type }, {
          withCredentials: true,
        })
        const data: AxiosPaperList[] = response.data;
        if(data.length > 0)
          setCars(prevCars => [...prevCars, ...data]);

      } catch (error) {
        console.log(error)
      }

    }

    fetchFromServer();
  }, [offset])

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
    {
      <Box sx={{ display: cars ? 'none' : 'block' }}>
        <SkeletonCard />
      </Box>
    }
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
      <Button onClick={  handleShowNewCars } sx={{ width:'250px', color: 'text.primary', '&:hover': { backgroundColor:'transparent' } }} startIcon={<AddIcon />} >Weitere Anzeigen</Button>
      </Box>
    </Box>
}
        </>
  )
}

export default SearchedCars;
