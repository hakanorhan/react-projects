import { lazy, useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosPaperList } from '../../../interfaces/IAxiosData';
import { URLs, SortEnums } from '../../../constants/values';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { COMPONENT_DISTANCE, LinkNewSearch } from '../../../themes/Theme';
import SearchIcon from '@mui/icons-material/Search';
const ShareComponent = lazy(() => import('../ShareComponent'));
import { LimitMediaQuery } from '../../../helper/helper';
import { scrollToTop } from '../../../helper/helper';
import CardComponent from '../../CardComponent';

const ListSearchedCars = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const [cars, setCars] = useState<AxiosPaperList[]>([]);

  const [count, setCount] = useState<number>(0);

  const [offset, setOffset] = useState<number>(0);

  // sort
  const [selectedSort, setSelectedSort] = useState<string>(SortEnums.PRICE_DOWN);
  const [foundNoCars, setFoundNoCars] =useState<boolean>(false);

  const LIMIT = LimitMediaQuery();
  
scrollToTop();

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
        setCount(anzahl);
        setFoundNoCars(false);

      } catch (error) {
        console.log(error)
        setFoundNoCars(true);
      }
    }
    fetch();
  }, [])

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
      
      if (data && data.length > 0) {
        setCars(prevCars => [...prevCars, ...data]);
        setOffset(offset + data.length)
        setFoundNoCars(false);
      } else {
        setFoundNoCars(true);
      }

    } catch (error) {
      console.log(error)
      setFoundNoCars(true)
    }

  }

  useEffect(() => {
     fetchFromServer();
  }, [selectedSort])

  const handleChangeSort = (event: SelectChangeEvent) => {
    const sortId = event.target.value as string;
    setSelectedSort(sortId);
    setCars([]);
    setOffset(0);
  };

  const handleShowNewCars = (_event: any) => {
    if (offset <= count) {
      fetchFromServer();
    }
      
  };

  const MemoizedContainer = useMemo(() => {

    return ({ axiosPaper }: { axiosPaper: AxiosPaperList }) => {

      return <CardComponent id={axiosPaper.inseratId} axiosPaper={axiosPaper}  />

    }
  }, [])
  
  const TopComponent = () => {
    const label = "sortieren";
    return <Grid container>
      <Grid item xs={5.5} sm={4} md={3}>
        <FormControl sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }} variant='standard'>
        <InputLabel htmlFor={ 'sort' }>{label}</InputLabel>
            <Select sx={{
              borderRadius: 0, '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                textDecoration: 'underline',
                color: 'black'
              },
            }}
              id= { label }
              value={selectedSort}
              label={label}
              name={'sort'}
              onChange={handleChangeSort}
              inputProps={{
                id: 'sort'
              }}
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

 const CarsNotfoundComponent = () => {
    return ( foundNoCars &&
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
        <Box width={'100%'} marginTop={'4rem'}>
          <Typography variant='h4' textAlign={'center'} component={'h3'}>{"Keine Fahrzeuge gefunden"}</Typography>
        </Box>
        <Box width={'100%'} marginTop={'2rem'} display={'flex'} justifyContent={'center'}>
          <Button onClick={() => { navigate(URLs.HOME_ALL_SEARCH_COUNT) }} sx={{ width:'190px' }} variant='contained'>{"Neue Suche"}</Button>
        </Box>
      </Box>
    )
  }

  return (
    <> 
    <Box sx={{ width: '95%', margin: 'auto' , paddingTop: '2rem' }}>
      <TopComponent />

      <CarsNotfoundComponent />

      <Box sx={{ display: cars ? 'flex' : 'none', width:'100%', minHeight:{xs: 'calc(100vh - 50px)', sm: '400px' } }}>
      <Grid container spacing={4}>
        {
          cars && cars.map((axiosPaper, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <MemoizedContainer key={index} axiosPaper={axiosPaper} />
            </Grid>
          ))
        }
      </Grid>
        </Box>
      <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
        <Button disabled={ offset >= count } onClick={handleShowNewCars} sx={{ width: '250px', color: 'text.primary', '&:hover': { backgroundColor: 'transparent' } }} startIcon={<AddIcon />} >Weitere Anzeigen</Button>
      </Box> 

    </Box>
</>
  )
}

export default ListSearchedCars;