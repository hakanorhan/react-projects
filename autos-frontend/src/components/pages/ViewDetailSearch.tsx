import React, { useEffect, useState } from 'react'
import { ViewDetailIconStyle, primaryColorMain, secondaryColorLight } from '../../themes/ThemeColor'
import { URLs } from '../../../../autos-backend/src/enums/URLs';
import axios from 'axios';
import { AxiosDataPublish, AxiosDetailsearch } from '../../../../autos-backend/src/interfaces/IAxiosData';
import CarImages from './dashboards/admin/components/CarImages';
import { Button, Grid, Paper, Typography } from '@mui/material';

import Person3Icon from '@mui/icons-material/Person3';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import Rating from '@mui/material/Rating';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldArea from '../formularFields/TextFieldArea';
import { seperateThousand } from '../../helper/helper';
import { Publish } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const paperElevationValue = 10;
const paperMarginTopValue = '0.9rem';
const paperPaddingValue = '0.7rem';


interface ViewDetailSearchComponentProps {
  id: number | null
}

interface GridComponentProps {
  icon: JSX.Element,
  title: string,
  value: any
}

interface GridTechnicalDetails {
  title: string,
  value?: string,
  icon?: JSX.Element,
  indexColor?: number
}

const ViewDetailSearch: React.FC<ViewDetailSearchComponentProps> = ({ id }) => {
  

  const [detailSearchValues, setDetailSearchValues] = useState<AxiosDetailsearch | null>(null);

  const dispatch = useDispatch();

  // TODO: useNavigate VieDetailsearch
  //const navigate = useNavigate();

  useEffect(() => {
    // valid brand
    const fetchData = async () => {
      // Detail search
      await axios.get<AxiosDetailsearch>(`${URLs.ORIGIN_SERVER}` + URLs.FETCH_DETAIL_SEARCH + `/${id}`, { withCredentials: true })

        .then(response => {
          const axiosData: AxiosDetailsearch = response.data;
          setDetailSearchValues(axiosData);
        })
        .catch(error => console.log(error))
    }
    fetchData();
  }, [id])

  const GridComponent: React.FC<GridComponentProps> = ({ icon, title, value }) => {
    return <Grid item xs={6}><div style={{ display: 'flex', margin: '0.5rem' }}> {icon} <div><Typography sx={{ fontSize: '0.9rem', color: 'gray', fontWeight: '300' }} display='inline-block' variant='h6' component='h2'>{title}</Typography> <Typography variant='subtitle2' component='p'>{value}</Typography></div></div></Grid>

  }

  const GridTechnicalComponent: React.FC<GridTechnicalDetails> = ({ title, value, icon, indexColor }) => {
    return <Grid sx={{
      backgroundColor: { xs: indexColor && indexColor % 2 === 1 ? 'whitesmoke' : 'white' },
      display: 'flex', padding: '0.7rem'
    }} item xs={12}> <Grid sx={{ fontWeight: '700' }} item xs={6}>{`${title}:`}</Grid> <Grid sx={{ fontWeight: '300' }} item xs={6}>{value}{icon}</Grid>
    </Grid>
  }

  const CheckOrFalseIcon: React.FC<{ checked: boolean }> = ({ checked }) => {
    return checked ? <Check sx={{ color: secondaryColorLight }} /> : <CloseIcon sx={{ color: secondaryColorLight }} />
  };

  const handlePublish = (canPublish: boolean) => {

    const timeStamp = dayjs();
    console.log(timeStamp + " Timestamp")

    async function sendData() {
      try {
        const inserateId = detailSearchValues?.inseratId
        const publishValue: boolean = canPublish;
        const axiosData: AxiosDataPublish = { inserateId, canPublish: publishValue };

        try {
        const response = await axios.post<AxiosDataPublish>(`${URLs.ORIGIN_SERVER}${URLs.POST_PUBLISH}`, axiosData , { withCredentials: true });
        // TODO: reolad
        //navigate(0);
          
        } catch(error) {
          console.log(error)
        }
        
      }catch(error) {

      }
    }
    sendData();
  }

  return (<>
  
    <CarImages id={id} />
    {detailSearchValues ?
      <>
        <Paper elevation={paperElevationValue} sx={{ padding: paperPaddingValue, marginTop: paperMarginTopValue, backgroundColor: 'white' }}>
          <Grid container>
            {/* Marke Modell */}
            <Grid item xs={6}>
              <Grid item xs={12}> <Typography variant='h6' component='h1'>{`${detailSearchValues?.brand} ${detailSearchValues?.model}`}</Typography> </Grid>
              <hr />
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: secondaryColorLight }}>
              <Typography variant='h5' component='h2' sx={{ marginRight: '1rem', float: 'right', color: primaryColorMain, backgroundColor: secondaryColorLight }}> {seperateThousand(detailSearchValues?.price)} €</Typography>
            </Grid>
            <Grid item xs={12}> <Typography variant='subtitle1' component='h1'>{detailSearchValues.isCardealer ? 'Händler' : 'Privatanbieter'}  <Rating sx={{ verticalAlign: 'middle' }} name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /></Typography></Grid>
            <Grid item xs={12}> <Typography variant='subtitle1' component='h1'>Gelsenkirchen</Typography></Grid>
            <Grid item xs={12}> <Button sx={{ height: '45px' }}>Kontaktieren</Button></Grid>

          </Grid>

        </Paper>

        <Paper elevation={paperElevationValue} sx={{ marginTop: paperMarginTopValue, backgroundColor: 'white' }}>
          <Grid container>
            <Grid item xs={6}>
              <GridComponent icon={<Person3Icon sx={ViewDetailIconStyle} />} title='Fahrzeughalter' value={detailSearchValues?.vehicleOwners} />
            </Grid>
            <Grid item xs={6}>
              <GridComponent icon={<AddRoadIcon sx={ViewDetailIconStyle} />} title='Kilometerstand' value={seperateThousand(detailSearchValues?.mileageKm) + " km"} />
            </Grid>
            <Grid item xs={6}>
              <GridComponent icon={<CalendarTodayIcon sx={ViewDetailIconStyle} />} title='Erstzulassung' value={(detailSearchValues?.registrationMonth < 10 ? '0' + detailSearchValues.registrationMonth : detailSearchValues?.registrationMonth) + " / " + detailSearchValues?.registrationYear} />
            </Grid>
            <Grid item xs={6}>
              <GridComponent icon={<DirectionsCarIcon sx={ViewDetailIconStyle} />} title='Leistung' value={detailSearchValues?.psPower + " PS"} />
            </Grid>
            <Grid item xs={6}>
              <GridComponent icon={<LocalGasStationIcon sx={ViewDetailIconStyle} />} title='Kraftstoffart' value={detailSearchValues?.fuel} />
            </Grid>
            <Grid item xs={6}>
              <GridComponent icon={<CarCrashIcon sx={ViewDetailIconStyle} />} title='Fahrzeugzustand' value={detailSearchValues && detailSearchValues?.accident ? 'Unfallwagen' : 'Unfallfrei'} />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={paperElevationValue} sx={{ marginTop: paperMarginTopValue, backgroundColor: 'white' }}>
          <h4 style={{ padding: paperPaddingValue }}> Technische Daten </h4>
          <hr style={{ margin: paperPaddingValue }} />
          <Grid container>
            <GridTechnicalComponent indexColor={1} title='Marke' value={detailSearchValues?.brand} />
            <GridTechnicalComponent indexColor={2} title='Modell' value={detailSearchValues?.model} />
            <GridTechnicalComponent indexColor={1} title='Fahrzeugtyp' value={detailSearchValues.cartype} />
            <GridTechnicalComponent indexColor={2} title='Hubraum' value={`${detailSearchValues.cubicCapacity} ccm³`} />
            <GridTechnicalComponent indexColor={1} title='Getriebeart' value={detailSearchValues.transmission} />
            <GridTechnicalComponent indexColor={2} title='HU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.huNew} />} />
            <GridTechnicalComponent indexColor={1} title='AU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.auNew} />} />

          </Grid>
        </Paper>

        <Paper elevation={paperElevationValue} sx={{ marginTop: paperMarginTopValue, backgroundColor: 'white' }}>
          <h4 style={{ padding: paperPaddingValue }}> Ausstattung </h4>
          <hr style={{ margin: paperPaddingValue }} />
          <Grid container>
            <GridTechnicalComponent indexColor={1} title='Scheckheftgepflegt' icon={<CheckOrFalseIcon checked={detailSearchValues.scheckheft} />} />
            <GridTechnicalComponent indexColor={2} title='Fahrtüchtig' icon={<CheckOrFalseIcon checked={detailSearchValues.fittodrive} />} />
            <GridTechnicalComponent indexColor={1} title='Abstandstempomat' icon={<CheckOrFalseIcon checked={detailSearchValues.abstandstempomat} />} />
            <GridTechnicalComponent indexColor={2} title='Ambientbeleuchtung' icon={<CheckOrFalseIcon checked={detailSearchValues.ambientbeleuchtung} />} />
            <GridTechnicalComponent indexColor={1} title='Klimatisierung' value={detailSearchValues.clima} />
            <GridTechnicalComponent indexColor={2} title='Head-up Display' icon={<CheckOrFalseIcon checked={detailSearchValues.headupdisplay} />} />
            <GridTechnicalComponent indexColor={1} title='Totwinkelassistent' icon={<CheckOrFalseIcon checked={detailSearchValues.totwinkelassistent} />} />
          </Grid>
        </Paper>

        <Paper elevation={paperElevationValue} sx={{ marginTop: paperMarginTopValue, backgroundColor: 'white' }}>
          <Grid sx={{ padding: paperPaddingValue }} item> <h4>Fahrzeugbeschreibung</h4> </Grid>
          <Grid item xs={12}> <hr style={{ margin: paperElevationValue }} /> </Grid>
          <Grid item xs={12}> <TextFieldArea padding= { paperPaddingValue } minRows={8} maxRows={10} disbled={true} areaText={detailSearchValues.description} /> </Grid>
        </Paper>
        <Grid container xs={12} sx={{ marginTop:'1rem', marginBottom:'1rem' }}>
      <Grid item xs={6}><Button onClick={() => { handlePublish(true); dispatch(setPublishProcessSuccess(true)); } } endIcon={<Publish />}>Freigeben</Button></Grid>
      <Grid item xs={6}><Button onClick={() => { handlePublish(false) }} sx={{ backgroundColor: primaryColorMain, color:'white', '&:hover': { backgroundColor: secondaryColorLight, color: primaryColorMain } }} endIcon={<CloseIcon />}>Zurückziehen</Button></Grid>
    </Grid>
      </>
      : <p> Fehler </p>
    }
  </>
  )
}

export default ViewDetailSearch;

/*
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
    */
