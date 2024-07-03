import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Boxprint,
  COMPONENT_DISTANCE, GreyHorizontalHR, ICON_FONT_SIZE, LINE_HEIGHT,
  paperViewDetailSearchTextArea, SX_ICON
} from '../../../../themes/Theme';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CarImages from '../CarImages';
import { seperateThousand } from '../../../../helper/helper';
import { TDescriptionComponent } from '../searchComponents/TDescriptionComponent';
import TextFieldArea from '../../../formularFields/TextFieldArea';

import Email from '@mui/icons-material/Email';
import Call from '@mui/icons-material/Call';
import Print from '@mui/icons-material/Print';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LocationOn from '@mui/icons-material/LocationOn';
import Person from '@mui/icons-material/Person';
import Store from '@mui/icons-material/Store';
import Info from '@mui/icons-material/Info';
import AccessTime from '@mui/icons-material/AccessTime';

import TextFieldCars from '../../../formularFields/TextFieldCars';
import { REGEX_EMAIL } from '../../../../regex/REGEX';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { fetchDetailSearch } from '../../../../redux/features/detailSearchSlice';
import GroupIcon from '@mui/icons-material/Group';
import ShareComponent from '../../ShareComponent';
import Logo from '../../../Logo';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useNavigate } from 'react-router-dom';
import { URLs, Roles } from '../../../../constants/values';
import { scrollToTop } from '../../../../helper/helper';

const buttonSecondarySX = {
  fontSize: '1.2rem',
  borderRadius: '0px',
  border: 'none',
  width: '100%',
  backgroundColor: 'primary.light',
  color: 'primary.contrastText',
  '&:hover': {
    backgroundColor: 'secondary.light',
    color: 'primary.contrastText',
  }, textTransform: 'none',
  '& .MuiButton-label': {
    textTransform: 'capitalize',
  },
}

const XS = 11.3;

interface GridTechnicalDetails {
  title: string,
  value?: string,
  icon?: JSX.Element
}

interface GridComponentProps {
  icon: JSX.Element,
  value: any
}

export interface ViewDetailProps {
  id: number | null | string | undefined,
  isUser: boolean
}

const ViewDetailGeneral: React.FC<ViewDetailProps> = ({ id, isUser }) => {
  const [open, setOpen] = useState(false);

  const detailSearchValues = useSelector((state: RootState) => state.detailSearch.detailState);
  const carsNotFound = useSelector((state: RootState) => state.detailSearch.carsNotFound);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userLogged = useSelector((state: RootState) => state.userLoggedIn);
  scrollToTop();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id)
      dispatch(fetchDetailSearch(id));
  }, [id])

  const GridTechnicalComponent: React.FC<GridTechnicalDetails> = ({ title, value, icon }) => {
    return <Grid sx={{ display: 'flex', padding: '0.7rem' }} item xs={12}>
      <Grid item xs={6}><Typography variant='body1' component='p'>{`${title}:`}</Typography></Grid>
      <Grid sx={{ textAlign:{xs:'end', sm:'start'} }} item xs={6}> <Typography variant='body1' component='p'>{value}</Typography>{icon}</Grid>
    </Grid>
  }

  const CheckOrFalseIcon: React.FC<{ checked: boolean }> = ({ checked }) => {
    return checked ? <Check sx={{ color: 'text.primary' }} /> : <CloseIcon sx={{ color: 'text.primary' }} />
  };

  const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
    return <Grid item><Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: LINE_HEIGHT }}> {icon}  <Typography sx={{ marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box></Grid>
  }

  const ContactFixed = () => {

    const [contactIsVisible, setContactIsVisible] = useState(true);

    useEffect(() => {
      const handleScroll = () => {

        const getY = window.scrollY < 1200;
        setContactIsVisible(getY)
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [contactIsVisible])

    return <Box sx={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      display: { xs: isUser ? contactIsVisible ? 'flex' : 'none' : 'none', lg: 'none' },
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: COMPONENT_DISTANCE,
      margin: 'auto',
      zIndex: 100,
      backgroundColor: 'whitesmoke'
    }} >
      <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'block' }, width: '50%', padding: '10px', paddingRight: '5px', textAlign: 'center' }}>
        <Button variant='contained' endIcon={<Call sx={{ color:'white' }}/>}>Anrufen</Button>
      </Box>
      <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'block' }, width: '50%', padding: '10px', paddingLeft: '5px', textAlign: 'center' }}>
        <Button onClick={() => { handleClickOpen() }} sx={buttonSecondarySX} variant='contained' endIcon={<Email  sx={{ color:'white' }}/>}>Email</Button>
      </Box>
    </Box>
  }

  const DialogEmail = () => {

    return (

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Kontakt</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            multiline
            minRows={11}
            maxRows={10}
            value={"Guten Tag," + "\n\n" + "ich habe Interesse an Ihrem Fahrzeug." + "\n\n" + "Mit freundlichen Grüßen."}
          />

          <TextFieldCars label='Email' onChange={() => { }} regex={REGEX_EMAIL} />

        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }} onClick={handleClose}>Abbrchen</Button>
          <Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }} type="submit">Senden</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const CarsNotfoundComponent = () => {
    return (!detailSearchValues &&
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'}>
        <Box width={'100%'} marginTop={'4rem'}>
          <Typography variant='h4' textAlign={'center'} component={'h3'}>{userLogged.role === Roles.ADMIN && userLogged.userLoggedIn ? "Sie sind als Admin angemeldet. Keine Fahrzeuge" : "Keine Fahrzeuge gefunden"}</Typography>
        </Box>
        <Box width={'100%'} marginTop={'2rem'} display={userLogged.role === Roles.ADMIN && userLogged.userLoggedIn ? 'none' : 'flex'} justifyContent={'center'}>
          <Button onClick={() => { navigate(URLs.HOME_ALL_SEARCH_COUNT) }} sx={{ width: '190px' }} variant='contained'>{"Neue Suche"}</Button>
        </Box>
      </Box>
    )
  }


  return (

    <Box sx={{ backgroundColor: 'background.default' }}>
      <Box sx={{ display:{xs:'none', lg:'block'}, height:'4rem', backgroundColor:'background.default'}}></Box>
      {carsNotFound && <CarsNotfoundComponent />}

      {detailSearchValues &&
        <Grid container sx={{ backgroundColor: 'background.paper', borderRadius: {xs: 0, lg:'40px'}, width: { xs: '100%', lg: '1070px' }, margin: 'auto', padding:{xs: 0, lg:'20px'} }}>



          {/*  Container */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ padding: { xs: 0, lg: COMPONENT_DISTANCE } }}>

              <CarImages id={id} multiple={true} isDetail={true} />
            </Box>

            <Box sx={{ display: { xs: 'none', lg: detailSearchValues?.isCardealer ? 'flex' : 'none' }, padding: { xs: 0, lg: COMPONENT_DISTANCE } }}>
              <Logo />
              <Box sx={{ marginLeft: '30px', marginRight: '10px' }}>
                <LocationOn sx={SX_ICON} />
              </Box>
              <Box sx={{ color: 'text.primary' }}>
                <Typography variant='body1'>{detailSearchValues?.companyName}</Typography>
                <Typography variant='body2'>{`${detailSearchValues?.streetNr}`}</Typography>
                <Typography variant='body2'>{`${detailSearchValues?.zipcode} ${detailSearchValues?.city}`}</Typography>
              </Box>

              <Box sx={{ marginLeft: '30px', color: 'text.primary' }}>
                {detailSearchValues?.isCardealer ? <GridComponent icon={<Store sx={SX_ICON} />} value={"Händler"} /> : <GridComponent icon={<Person sx={SX_ICON} />} value={"Privat"} />}
                <Typography variant='body1'>{`Tel: ${detailSearchValues?.telNr}`}</Typography>
                <Box display={'flex'}><Rating sx={{ color: 'primary.main', verticalAlign: 'middle', fontSize: '1.2rem' }} name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly /><Typography sx={{ marginLeft: '7px' }} variant='body2'>45 Bewertungen</Typography></Box>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', lg: detailSearchValues?.isCardealer ? 'none' : 'flex' }, padding: { xs: 0, lg: COMPONENT_DISTANCE } }}>
              <Box sx={{ marginRight: '10px' }}>
                <LocationOn sx={SX_ICON} />
              </Box>
              <Box sx={{ color: 'text.primary' }}>
                <Typography variant='body1'>{`${detailSearchValues?.zipcode} ${detailSearchValues?.city}`}</Typography>
              </Box>

              <Box sx={{ marginLeft: '50px' }}>
                <Box>
                  {detailSearchValues?.isCardealer ? <GridComponent icon={<Store sx={SX_ICON} />} value={"Händler"} /> : <GridComponent icon={<Person sx={SX_ICON} />} value={"Privat"} />}
                </Box>
                <Typography variant='body1'>{`Tel: ${detailSearchValues?.telNr}`}</Typography>
                <Box display={'flex'}><Rating sx={{ color: 'icon.main', verticalAlign: 'middle', fontSize: '1.2rem' }} name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly /><Typography sx={{ marginLeft: '7px' }} variant='body2'>45 Bewertungen</Typography></Box>

              </Box>
            </Box>

          </Grid>

          {/* Short Detail */}
          <Grid sx={{ width: { xs: '95%', lg: '100%', margin: 'auto', marginTop: 0 }, paddingLeft: { xs: 0, lg: COMPONENT_DISTANCE }, paddingRight: { xs: 0, lg: COMPONENT_DISTANCE }, paddingTop: { xs: COMPONENT_DISTANCE } }} item xs={XS} lg={5}>
            <Boxprint>
              <Grid container>
                <Grid sx={{ display: 'flex' }} item xs={4} sm={4}>
                  <ShareComponent />
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={4} sm={4}>
                  <FavoriteBorder sx={{ cursor: 'pointer', marginRight: COMPONENT_DISTANCE, color: 'text.primary' }} /> <Typography sx={{ color:'text.primary', cursor: 'pointer' }} variant='body1' component='p'>{"Merken"}</Typography>
                </Grid>
                <Grid onClick={() => { window.print() }} item sx={{ cursor: 'pointer', justifyContent: {xs: 'end', sm: 'end'}, display: 'flex' }} xs={4} sm={4}>
                  <Print sx={{ marginRight: COMPONENT_DISTANCE, color: 'text.primary' }} /> <Typography sx={{color:'text.primary'}} variant='body1' component='p'>{"Drucken"}</Typography>
                </Grid>
              </Grid>
            </Boxprint>

            <Grid sx={{ height: '100%', marginTop: '1rem' }} container>
              {/* Marke Modell */}
              <Grid item xs={12}> <Typography sx={{color:'text.primary'}} variant='h5' fontWeight='bold' component='h1'>{`${detailSearchValues?.brand} ${detailSearchValues?.model}`}</Typography> </Grid>

              <Box sx={{width:'100%'}}>
              <Typography variant="h4" fontWeight='bold' component="h2" sx={{ color:'text.primary', display: 'flex'}}>
                      {seperateThousand(detailSearchValues.price)} {" €"}
                    </Typography>
              </Box>
              <Box sx={{ width: '100%' }}>
              <Typography variant="h6" component="h2" sx={{ color:'text.primary', display: 'flex'}}>
                      Finanzierung ab {seperateThousand(550)} {" €"}
                    </Typography>
              </Box>
              <Grid sx={{ marginTop: COMPONENT_DISTANCE }} item xs={12}>
                <GreyHorizontalHR />
              </Grid>
              <Box sx={{ color:'text.primary', display: 'flex', marginTop: '1rem' }}>
                <HealthAndSafetyIcon sx={{ color: 'text.primary', fontSize: '3rem', marginRight: '10px' }} />
                <Box>
                  <Typography variant='h6'>{"Ab 12,89€ monatlich"}</Typography>
                  <Typography variant='body2'>{"KFZ-Versicherung vergleichen"}</Typography>
                </Box>
              </Box>

              <Grid sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }} item xs={12}>
                <GreyHorizontalHR />
              </Grid>


              <TDescriptionComponent />


            </Grid>

            <Grid item xs={12} sx={{ display: { xs: 'none', lg: 'flex' }, paddingTop: COMPONENT_DISTANCE }}>
              <Box sx={{ width: '49%', textAlign: 'center' }}>
                <Button sx={{ color: 'white', backgroundColor:'secondary.main', ':hover&': {backgroundColor:'primary.light', color:'white'} }} variant='contained' endIcon={<Call sx={{ color:'white' }} />}>Anrufen</Button>
              </Box>
              <Box sx={{ width: '2%' }}></Box>
              <Box sx={{ width: '49%', textAlign: 'center' }}>
                <Button onClick={() => { handleClickOpen() }} sx={buttonSecondarySX} variant='contained' endIcon={<Email sx={{ color:'white' }}/>}>Email</Button>
              </Box>
            </Grid>

          </Grid>

          <Grid item sx={{ '@media print': { breakBefore: 'page' }, margin: 'auto' }} xs={XS}>
            <Grid sx={{ marginTop: COMPONENT_DISTANCE }} item xs={12}>
              <GreyHorizontalHR />
            </Grid>
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Typography variant='h6' component='h4' sx={{ paddingTop: COMPONENT_DISTANCE }}> Technische Daten </Typography>
              </Grid>
              <Grid container sx={{ paddingTop: COMPONENT_DISTANCE }}>
                <GridTechnicalComponent title='Marke' value={detailSearchValues?.brand} />
                <GridTechnicalComponent title='Modell' value={detailSearchValues?.model} />
                <GridTechnicalComponent title='Fahrzeugtyp' value={detailSearchValues.cartype} />
                <GridTechnicalComponent title='Farbe' value={detailSearchValues.color} />
                <GridTechnicalComponent title='Hubraum' value={`${detailSearchValues.cubicCapacity} ccm³`} />
                <GridTechnicalComponent title='Getriebeart' value={detailSearchValues.transmission} />
                <GridTechnicalComponent title='HU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.huNew} />} />
                <GridTechnicalComponent title='AU neu' icon={<CheckOrFalseIcon checked={detailSearchValues.auNew} />} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ margin: 'auto' }} xs={XS}>

            <GreyHorizontalHR />
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Typography variant='h6' component='h4' sx={{ paddingTop: COMPONENT_DISTANCE }}> Ausstattung </Typography>
              </Grid>

              <Grid container sx={{ paddingTop: COMPONENT_DISTANCE }}>
                <GridTechnicalComponent title='Scheckheftgepflegt' icon={<CheckOrFalseIcon checked={detailSearchValues.scheckheft} />} />
                <GridTechnicalComponent title='Fahrtüchtig' icon={<CheckOrFalseIcon checked={detailSearchValues.fittodrive} />} />
                <GridTechnicalComponent title='Abstandstempomat' icon={<CheckOrFalseIcon checked={detailSearchValues.abstandstempomat} />} />
                <GridTechnicalComponent title='Ambientbeleuchtung' icon={<CheckOrFalseIcon checked={detailSearchValues.ambientbeleuchtung} />} />
                <GridTechnicalComponent title='Klimatisierung' value={detailSearchValues.clima} />
                <GridTechnicalComponent title='Head-up Display' icon={<CheckOrFalseIcon checked={detailSearchValues.headupdisplay} />} />
                <GridTechnicalComponent title='Totwinkelassistent' icon={<CheckOrFalseIcon checked={detailSearchValues.totwinkelassistent} />} />
              </Grid>
            </Grid>
          </Grid>


          <Grid item sx={{ '@media print': { breakBefore: 'page' }, margin: 'auto' }} xs={XS}>

            <Box sx={paperViewDetailSearchTextArea}>
              <GreyHorizontalHR />
              <Typography variant='h6' component='h4' sx={{ paddingTop: COMPONENT_DISTANCE }}>Fahrzeugbeschreibung</Typography>
              <Grid sx={{ paddingTop: COMPONENT_DISTANCE }} item xs={12}> <TextFieldArea minRows={8} maxRows={10} disbled={true} areaText={detailSearchValues.description} /> </Grid>
            </Box>

          </Grid>

          <Box sx={{ width: '94%', margin: 'auto' }}>
            <Typography variant='h6' component='h4'>Informationen zum/zur Verkäufer:in</Typography>
            <Typography sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }}>Anbieter:in seit  {detailSearchValues.since}</Typography>

            <Box width='100%'>
              {detailSearchValues.isCardealer ? <GridComponent icon={<Store sx={SX_ICON} />} value={"Händler"} /> : <GridComponent icon={<Person sx={SX_ICON} />} value={"Privat"} />}

              {
                detailSearchValues.isCardealer
                  ? <Box>
                    <Typography>{detailSearchValues.companyName}</Typography>
                  </Box>
                  : <></>
              }

              <Rating sx={{ color: 'icon.main', verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
              <Typography>45 Bewertungen</Typography>

              <Box sx={{ display: detailSearchValues.isCardealer ? 'flex' : 'none', marginTop: COMPONENT_DISTANCE }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><AccessTime sx={SX_ICON} /></Box>
                <Box>
                  <Typography>{"Geöffnet"}</Typography>
                  <Typography>{"Beispiel. Schließt um 19:00 Uhr"}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: detailSearchValues.isCardealer ? 'flex' : 'none', marginTop: COMPONENT_DISTANCE }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><GroupIcon sx={SX_ICON} /></Box>
                <Box>
                  <Typography>{"Ansprechpatner:in"}</Typography>
                  <Typography>{detailSearchValues.foreName} {detailSearchValues.sureName}</Typography>
                  <Typography>{detailSearchValues.telNr}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', marginTop: COMPONENT_DISTANCE, paddingBottom: detailSearchValues.isCardealer ? 0 : "2rem" }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><LocationOn sx={SX_ICON} /></Box>
                <Box>
                  <Typography>{detailSearchValues.streetNr}</Typography>
                  <Typography>{detailSearchValues.zipcode} {detailSearchValues.city}</Typography>
                  <Typography>{detailSearchValues.federalState}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: detailSearchValues.isCardealer ? 'flex' : 'none', marginTop: COMPONENT_DISTANCE, paddingBottom: "2rem" }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><Info sx={SX_ICON} /></Box>
                <Box>
                  <Typography>{detailSearchValues.impressum}</Typography>
                </Box>
              </Box>

            </Box>
          </Box>
          <DialogEmail />
          <ContactFixed />

        </Grid>
      }
      <Box sx={{height:'4rem', display:{xs:'none', lg:'block'}, backgroundColor:'background.default'}}></Box>
    </Box>
  )
}

export default ViewDetailGeneral;