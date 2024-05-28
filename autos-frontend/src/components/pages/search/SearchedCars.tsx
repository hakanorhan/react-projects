import React, { useEffect, useState } from 'react'
import { Box, Card, CardActionArea, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AxiosPaperList } from '../../../interfaces/IAxiosData';
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import CarImages from '../dashboards/admin/components/CarImages';
import { ShowFastPaper } from './searchComponents/ShowFastPaper';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { COMPONENT_DISTANCE, ZOOM_HOVER } from '../../../themes/Theme';
import { DisplayTypes } from '../../../enums/DisplayTypes';

const LIMIT = 5;

const SearchedCars: React.FC<{ type: DisplayTypes }> = ({ type }) => {

  const navigate = useNavigate();

  const [cars, setCars] = useState<AxiosPaperList[]>();

  const [offset, setOffset] = useState<number>(0);

  // ----- Pagination ------
  const [page, setPage] = useState<number>(1);
  const handlePagiation = (_event: any, value: number) => {
    const offsetTemp: number = LIMIT * (value - 1);
    setOffset(offsetTemp);
    setPage(value);
  };

  useEffect(() => {
    async function fetchFromServer() {
      try {
        const limit = LIMIT;
        const response = await axios.post<AxiosPaperList[]>(URLs.ORIGIN_SERVER + URLs.FETCH_CLICKED_CARS, { offset, limit, type }, {
          withCredentials: true,
        })
        const data = response.data;
        setCars(data);

      } catch (error) {
        console.log(error)
      }

    }

    fetchFromServer();
  }, [page])

  const handleShowDetail = ({ id }: ({ id: number })) => {
    navigate(URLs.FETCH_DETAIL_SEARCH + `/${id}`);
  }
  const ListContainer: React.FC<{ axiosPaper: AxiosPaperList }> = ({ axiosPaper }) => {

    return <Card elevation={0} sx={ ZOOM_HOVER }
      onClick={() => { handleShowDetail({ id: axiosPaper.inseratId }) }}>
      <CardActionArea>
        <CarImages id={axiosPaper.inseratId} multiple={false} />

        {/* technical description */}
        <ShowFastPaper detailSearchValues={axiosPaper} />

      </CardActionArea>
    </Card>
  }

  return (

    <Box sx={{ width: '95%', margin: 'auto', paddingTop: '20px' }}>

      <Grid container spacing={4}>
        {
          cars ? cars.map((axiosPaper, index) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={index}>
              <ListContainer key={index} axiosPaper={axiosPaper} />
            </Grid>
          )) : <CircularProgress />
        }
      </Grid>

      <Pagination sx={{ marginTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }} count={1} page={page} onChange={handlePagiation} />
    </Box>

  )
}

export default SearchedCars;
