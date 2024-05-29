import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Rating, Typography, colors } from '@mui/material';
import {
  Boxprint,
  COMPONENT_DISTANCE, GreyHorizontalHR, GreyHorizontalTechBoldHR, ICON_FONT_SIZE, LINE_HEIGHT,
  fontBold, fontLight, fontRegular, paperViewDetailSearchTextArea
} from '../../../../themes/Theme';
import CalculateIcon from '@mui/icons-material/Calculate';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CarImages, { CarImagesProps } from '../../dashboards/admin/components/CarImages';
import { seperateThousand } from '../../../../helper/helper';
import { TDescriptionComponent } from '../searchComponents/TDescriptionComponent';
import TextFieldArea from '../../../formularFields/TextFieldArea';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextFieldCars from '../../../formularFields/TextFieldCars';
import { REGEX_EMAIL } from '../../../../regex/REGEX';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { fetchDetailSearch } from '../../../../redux/features/search/detailSearch';

const gridItemXS = 4;
const gridItemSM = 4;
const gridItemMD = 4;

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

const ViewDetailGeneral: React.FC<CarImagesProps> = ({ id }) => {

  //const [detailSearchValues, setDetailSearchValues] = useState<AxiosDetailsearch | null>(null);
  const [open, setOpen] = React.useState(false);

  const detailSearchValues = useSelector((state: RootState) => state.detailSearch.detailState);
  const dispatch = useDispatch<AppDispatch>();

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
      <Grid item xs={6}><Typography sx={{}} variant='body1' component='p'>{`${title}:`}</Typography></Grid>
      <Grid item xs={6}> <Typography sx={{ fontWeight: 'bold' }} variant='body1' component='p'>{value}</Typography>{icon}</Grid>
    </Grid>
  }

  const CheckOrFalseIcon: React.FC<{ checked: boolean }> = ({ checked }) => {
    return checked ? <Check sx={{ color: 'secondary.contrastText' }} /> : <CloseIcon sx={{ color: 'sexondary.contrastText' }} />
  };

  const GridComponent: React.FC<GridComponentProps> = ({ icon, value }) => {
    return <Grid item><Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: LINE_HEIGHT }}> {icon}  <Typography sx={{ fontFamily: fontRegular, marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{value}</Typography></Box></Grid>
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
      display: { xs: contactIsVisible ? 'flex' : 'none', lg: 'none' },
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: COMPONENT_DISTANCE,
      margin:'auto',
      backgroundColor: 'white'
    }} >
      <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'block' }, width: '50%', textAlign: 'center' }}>
        <Button sx={{ height: '55px' }} variant='contained' endIcon={<CallIcon />}>Anrufen</Button>
      </Box>
      <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'block' }, width: '50%', textAlign: 'center' }}>
        <Button onClick={() => { handleClickOpen() }} sx={{ height: '55px', backgroundColor: 'secondary.main', color: 'primary.main' }} variant='contained' endIcon={<EmailIcon />}>Email</Button>
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

          <TextFieldCars id='email' label='Email' onChange={() => { }} regex={REGEX_EMAIL} />

        </DialogContent>
        <DialogActions>
          <Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }} onClick={handleClose}>Abbrchen</Button>
          <Button sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }} type="submit">Senden</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box>
    <Grid container sx={{ backgroundColor:'white', width: { xs: '100%', lg: '1050px' }, margin: 'auto', marginTop: {xs: 0, lg: '4rem'},  marginBottom: {xs: 0, lg: '4rem'} }}>

      <ContactFixed />

      {/*  Container */}
      <Grid item xs={12} lg={7} sx={{ border: { xs: 'none', lg: 'solid' }, borderWidth:'1px', color: colors.grey[300] }}>
        <Box sx={{ padding: {xs: 0, lg: COMPONENT_DISTANCE } }}>
        <CarImages id={id} multiple={true} isDetail={ true } />
        </Box>
      </Grid>
      {detailSearchValues ?
        <>

        {/* Short Detail */}
          <Grid sx={{ width:{xs: '95%', lg:'100%', margin:'auto', marginTop: 0}, paddingLeft: COMPONENT_DISTANCE, paddingRight: COMPONENT_DISTANCE, paddingTop: {xs: COMPONENT_DISTANCE} }} item xs={ XS } lg={ 5 }>
            <Boxprint>
            <Grid container>
              <Grid sx={{ display: 'flex' }} item xs={4}>
                <ShareIcon sx={{ cursor: 'pointer', marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily: fontBold }} variant='body1' component='p'>{"Teilen"}</Typography>
              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={4}>
                <FavoriteBorderIcon sx={{ cursor: 'pointer', marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily: fontBold }} variant='body1' component='p'>{"Merken"}</Typography>
              </Grid>
              <Grid onClick={() => { window.print() }} item sx={{ cursor:'pointer', justifyContent: 'end', display: 'flex' }} xs={4}>
                <PrintIcon sx={{ marginRight: COMPONENT_DISTANCE }} /> <Typography sx={{ fontFamily: fontBold }} variant='body1' component='p'>{"Drucken"}</Typography>
              </Grid>
            </Grid>
            </Boxprint>

            <Grid sx={{ height: '100%', paddingTop: COMPONENT_DISTANCE }} container>
              {/* Marke Modell */}
              <Grid item xs={12}> <Typography sx={{ fontFamily: fontBold }} variant='h6' component='h1'>{`${detailSearchValues?.brand} ${detailSearchValues?.model}`}</Typography> </Grid>

              <Grid item xs={5.5}>
                <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                  <Typography variant='h6' component='h2' sx={{ fontFamily: fontBold, display: 'flex', justifyContent: 'center' }}>{seperateThousand(detailSearchValues.price)} {" €"}</Typography>
                  <Typography variant='body2' component='p' sx={{ display: 'flex', justifyContent: 'center' }}>{"Preis"}</Typography>
                </Box>
              </Grid>

              <Grid item xs={5.5}>
                <Box sx={{ paddingTop: COMPONENT_DISTANCE, paddingBottom: COMPONENT_DISTANCE }}>
                  <Button sx={{ '@media print': { display: 'none' }, backgroundColor:'secondary.main', color: 'primary.main' }} variant='contained' endIcon={<CalculateIcon />}>Finanzieren</Button>
                  <Typography sx={{ textAlign: 'center', '@media screen': { display: 'none' } }}>{ 'Finanzierung' }</Typography>
                  <Typography variant='h6' component='h2' sx={{ fontFamily: fontBold, display: 'flex', justifyContent: 'center' }}>{seperateThousand(550)} {" €"}</Typography>
                </Box>
                
              </Grid>

              <TDescriptionComponent />

              <Grid item xs={gridItemXS} sm={gridItemSM} md={gridItemMD} lg={4}>
                <Rating sx={{ color: 'primary.main', verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
              </Grid>
              <Grid item xs={gridItemXS} sm={gridItemSM} md={gridItemMD} lg={4}>
                <Box display='flex' justifyContent='left' >
                  {detailSearchValues.isCardealer ? <GridComponent icon={<StoreIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Händler"} /> : <GridComponent icon={<PersonIcon sx={{ fontSize: '1.2rem' }} />} value={"Privat"} />}
                </Box>
              </Grid>
              <Grid item xs={detailSearchValues.city.length > 13 ? 12 : gridItemXS} sm={detailSearchValues.city.length > 13 ? 12 : gridItemSM} md={detailSearchValues.city.length > 13 ? 12 : gridItemSM} lg={12}>
                <Box display='flex' justifyContent='left' >
                  <Grid item><Box sx={{ display: 'flex', marginBottom: LINE_HEIGHT }}> <LocationOnIcon sx={{ fontSize: ICON_FONT_SIZE }} />  <Typography sx={{ fontFamily: fontRegular, marginLeft: '.5rem', whiteSpace: 'nowrap' }} variant='body1' component='p'>{detailSearchValues.city}</Typography></Box></Grid>
                </Box>
              </Grid>

            </Grid>

            <Grid item xs= {12} sx={{ display: { xs:'none', lg: 'flex' }, paddingTop: COMPONENT_DISTANCE }}>
            <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Button sx={{ }} variant='contained' endIcon={<CallIcon />}>Anrufen</Button>
      </Box>
      <Box sx={{ width: '50%', textAlign: 'center' }}>
        <Button onClick={() => { handleClickOpen() }} sx={{ backgroundColor: 'secondary.main', color: 'primary.main' }} variant='contained' endIcon={<EmailIcon />}>Email</Button>
      </Box>
            </Grid>

          </Grid>

          <Grid item sx={{ '@media print': { breakBefore: 'page' }, margin:'auto' }} xs={ XS }>
            <GreyHorizontalTechBoldHR />
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Typography variant='h6' component='h4' sx={{ fontFamily: fontBold, paddingTop: COMPONENT_DISTANCE }}> Technische Daten </Typography>
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

          <Grid item sx={{ margin:'auto' }} xs={ XS }>

            <GreyHorizontalHR />
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Typography variant='h6' component='h4' sx={{ fontFamily: fontBold, paddingTop: COMPONENT_DISTANCE }}> Ausstattung </Typography>
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


          <Grid item sx={{ '@media print': { breakBefore: 'page' }, margin:'auto' }} xs={ XS }>

            <Box sx={paperViewDetailSearchTextArea}>
              <GreyHorizontalHR />
              <Typography variant='h6' component='h4' sx={{ fontFamily: fontBold, paddingTop: COMPONENT_DISTANCE }}>Fahrzeugbeschreibung</Typography>
              <Grid sx={{ paddingTop: COMPONENT_DISTANCE }} item xs={12}> <TextFieldArea minRows={8} maxRows={10} disbled={true} areaText={detailSearchValues.description} /> </Grid>
            </Box>

          </Grid>

          <Grid sx={{ paddingTop: COMPONENT_DISTANCE, margin:'auto' }} xs={ XS }>
            <Typography sx={{ fontFamily: fontBold }} variant='h6' component='h4'>Informationen zum/zur Verkäufer:in</Typography>
            <Typography sx={{ marginTop: COMPONENT_DISTANCE, marginBottom: COMPONENT_DISTANCE }}>Anbieter:in seit  {detailSearchValues.since}</Typography>

            <Box width='100%'>
              {detailSearchValues.isCardealer ? <GridComponent icon={<StoreIcon sx={{ fontSize: ICON_FONT_SIZE }} />} value={"Händler"} /> : <GridComponent icon={<PersonIcon sx={{ fontSize: '1.2rem', fontFamily: fontBold }} />} value={"Privat"} />}

              {
                detailSearchValues.isCardealer
                  ? <Box>
                    <Typography>{detailSearchValues.companyName}</Typography>
                  </Box>
                  : <></>
              }

              <Rating sx={{ color: 'primary.main', verticalAlign: 'middle', fontSize: ICON_FONT_SIZE }} name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
              <Typography sx={{ fontFamily: fontLight }}>45 Bewertungen</Typography>

              <Box sx={{ display: 'flex', marginTop: COMPONENT_DISTANCE }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><AccessTimeIcon /></Box>
                <Box>
                  <Typography>{"Geöffnet"}</Typography>
                  <Typography>{"Beispiel. Schließt um 19:00 Uhr"}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', marginTop: COMPONENT_DISTANCE, paddingBottom: "2rem" }}>
                <Box sx={{ marginRight: COMPONENT_DISTANCE }}><LocationOnIcon /></Box>
                <Box>
                  <Typography>{detailSearchValues.streetNr}</Typography>
                  <Typography>{detailSearchValues.city}</Typography>
                  <Typography>{detailSearchValues.federalState}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <DialogEmail />

        </>
        : <Box><p>Keine Fahrzeuge. Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.</p></Box>
      }
    </Grid>
    </Box>
  )
}

export default ViewDetailGeneral;