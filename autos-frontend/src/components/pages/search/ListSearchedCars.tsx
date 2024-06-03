import { useEffect, useMemo, useState } from 'react'
import { Button, useMediaQuery, Box, Card, CardActionArea, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosPaperList } from '../../../interfaces/IAxiosData';
import { URLs } from '../../../enums/URLs';
import axios from 'axios';
import CarImages from './CarImages';
import { ShowFastPaper } from './../search/searchComponents/ShowFastPaper';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SortEnums } from '../../../enums/SortEnums';
import { COMPONENT_DISTANCE, LinkNewSearch, ZOOM_HOVER } from '../../../themes/Theme';
import SearchIcon from '@mui/icons-material/Search';
import ShareComponent from '../ShareComponent';

const ListSearchedCars = () => {

  const LIMIT = 3;

  const location = useLocation();

  const navigate = useNavigate();

  const [cars, setCars] = useState<AxiosPaperList[]>([]);

  const [count, setCount] = useState<number>(0);

  const [offset, setOffset] = useState<number>(0);

  // sort
  const [selectedSort, setSelectedSort] = useState<string>(SortEnums.PRICE_DOWN);

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

        setCount(anzahl);

      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  }, [])

  useEffect(() => {
    async function fetchFromServer() {
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
          params: { brandid, modelid, price, cartypeid, blandid, dateFrom, dateTo, LIMIT, offset, sorttype }
        })
        const data: AxiosPaperList[] = response.data;
        if (data && data.length > 0)
          setCars(prevCars => [...prevCars, ...data]);

      } catch (error) {
        console.log(error)
      }

    }

    fetchFromServer();
  }, [selectedSort, offset])

  const handleChangeSort = (event: SelectChangeEvent) => {
    const sortId = event.target.value as string;
    setSelectedSort(sortId);
  };

  const handleShowDetail = ({ id }: ({ id: number })) => {
    navigate(URLs.FETCH_DETAIL_SEARCH + `/${id}`);
  }

  const handleShowNewCars = (_event: any) => {
    if (offset + LIMIT <= count)
      setOffset(offset + LIMIT);
  };

  const MemoizedContainer = useMemo(() => {

    return ({ axiosPaper }: { axiosPaper: AxiosPaperList }) => {

      return <>{<Card elevation={1} sx={ZOOM_HOVER}
        onClick={() => { handleShowDetail({ id: axiosPaper.inseratId }) }}>
        <CardActionArea>

          <CarImages id={axiosPaper.inseratId} multiple={false} />

          {/* technical description */}
          <ShowFastPaper detailSearchValues={axiosPaper} />

        </CardActionArea>
      </Card>}</>
    }
  }, [])

  const TopComponent = () => {
    return <Grid container>
      <Grid item xs={5.5} sm={4} md={3}>
        <FormControl sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }} variant='standard'>
          <InputLabel id="sort">Sortieren</InputLabel>
          <Select
            labelId='sort'
            value={selectedSort}
            label={"Sortieren"}
            onChange={handleChangeSort}
          >
            <MenuItem value={SortEnums.EZ_UP}>Erstzulassung <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={SortEnums.EZ_DOWN}>Erstzulassung <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={SortEnums.KM_UP}>Kilometerstand <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={SortEnums.KM_DOWN}>Kilometerstand <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={SortEnums.INSREATE_UP}>Inserate <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={SortEnums.INSREATE_DOWN}>Inserate <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={SortEnums.POWER_UP}>Leistung <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={SortEnums.POWER_DOWN}>Leistung <ArrowDownwardIcon fontSize='small' /></MenuItem>
            <hr />
            <MenuItem value={SortEnums.PRICE_UP}>Preis <ArrowUpwardIcon fontSize='small' /></MenuItem>
            <MenuItem value={SortEnums.PRICE_DOWN}>Preis <ArrowDownwardIcon fontSize='small' /></MenuItem>

          </Select>

        </FormControl>
      </Grid>
      <Grid item xs={3.75}> <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}> <LinkNewSearch to={URLs.HOME_ALL_SEARCH_COUNT}> <Box sx={{ display: 'flex' }}><SearchIcon /><Typography sx={{ marginLeft: '0.3rem' }}> Neue Suche</Typography></Box></LinkNewSearch></Box> </Grid>
      <Grid item xs={2.75}> <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}> <ShareComponent /></Box> </Grid>
    </Grid>
  }

  return (
    <Box sx={{ minHeight: '95vh', width: '95%', margin: 'auto', paddingTop: '2rem' }}>
      <TopComponent />
      <Grid container spacing={4}>
        {
          cars && cars.map((axiosPaper, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <MemoizedContainer key={index} axiosPaper={axiosPaper} />
            </Grid>
          ))
        }
      </Grid>

      <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }}>
        <Button onClick={handleShowNewCars} sx={{ width: '250px', color: 'text.primary', '&:hover': { backgroundColor: 'transparent' } }} startIcon={<AddIcon />} >Weitere Anzeigen</Button>
      </Box>
    </Box>

  )
}

export default ListSearchedCars;
/*
 <Box sx={{ display:'column', backgroundColor:'background.default', height: '80vh', width:'100%' }}>
      <Typography color={'text.primary'} paddingTop={'20%'} align="center" variant={'h4'} component={'p'}>{"Keine Fahrzeuge gefunden"}</Typography>
      <Box sx={{ margin:'auto', width:'150px' }}> <LinkNewSearch to={URLs.HOME_ALL_SEARCH_COUNT}> <Box sx={{ display: 'flex' }}><SearchIcon /><Typography sx={{ marginLeft: '0.3rem' }}> Neue Suche</Typography></Box></LinkNewSearch></Box>
      
      
    </Box>
    */