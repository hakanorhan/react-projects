import { Box, Typography, Grid, colors, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { COMPONENT_DISTANCE, LIGHT_PRIMARY_CONTRAST_TEXT, LinkDrawer } from "../../themes/Theme";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setModeDarkLight } from "../../redux/features/darkLightReducer";
import { URLs } from "../../constants/values";
import afterComponentViewed from "../../helper/lazyLoading/afterComponentViewed";

const gridItemStyle = { marginBottom: { xs: '3rem' } };

const gridXS = 12;
const gridSM = 6;
const gridMD = 4;
const gridLG = 3;

const COMPANY = [
  "Über cars.de",
  "Karriere",
  "Presse",
  "AGB",
  "Datenschutz",
  "Impressum"
];

const SERVICE = [
  "Kontakt",
  "Hilfe"
];

export default function Footer() {

  const [isVisible, setIsVisible] = useState(false);
  const LazyIconsComponent = lazy(() => import('./IconsComponent'));

  useEffect(() => {
    afterComponentViewed(setIsVisible, 'iconsDivId')
  }, [])

  const CreateLink = (linkname: string, index: number, url: URLs = URLs.HOME_ALL_SEARCH_COUNT) => {
    return <Link key={index} style={LinkDrawer} to={url}> <Typography sx={{ '@media print': { color: 'black' }, color: LIGHT_PRIMARY_CONTRAST_TEXT }} key={index} > {linkname} </Typography> </Link>
  }

  const createHeaderForLinks = (header: string) => {
    return <Typography paddingBottom={COMPONENT_DISTANCE} key={header} variant="h5" component='h1' sx={{ '@media print': { color: 'black' }, color: LIGHT_PRIMARY_CONTRAST_TEXT }}>{header}</Typography>
  }

  const DarkMode = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.mode.mode);
  
    useEffect(() => {
      if (localStorage.getItem('cars.de.mode')) {
        const localStorageMode = localStorage.getItem('cars.de.mode');
        const valueLocalStorage = localStorageMode === 'dark';
        dispatch(setModeDarkLight(valueLocalStorage));
      } else {
        localStorage.setItem('cars.de.mode', "light");
      }
    }, [])
  
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const localStorageMode = checked ? "dark" : "light";
      localStorage.setItem('cars.de.mode', localStorageMode);
      dispatch(setModeDarkLight(checked));
    }

    return         <Box sx={{ '@media print': { display: 'none' }, '@media screen': { display: 'flex' }, color: 'whitesmoke' }}>

    {<Switch 
    id={"darkLightMode"}
    sx={{
      width: '60px',
      '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
          '& + .MuiSwitch-track': {
            backgroundColor: colors.yellow[600],
            opacity: 1,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        color: 'primary.contrastText',
        opacity: 1
      },
      '& .MuiSwitch-track': {
        backgroundColor: 'primary.conrastText',
        opacity: 1,
      },
    }}
    
      checked={mode}
      onChange={handleChangeSwitch}
    />}
    <Typography sx={{ alignContent: 'center', color: 'primary.contrastText' }} variant="body1" component='p'> {mode ? "Dunkler Modus" : "Heller Modus"} </Typography>
    </Box>

  }

  return (
    
    <Box  sx={{ backgroundColor: 'primary.main', '@media print': { breakBefore: 'page' } }}>
      <div id="iconsDivId">
      <Grid sx={{ margin: 'auto', padding: '2rem', paddingTop: '3rem' }} container item xs={12} md={11}>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Unternehmen")
          }

          {
            COMPANY.map((links, index) => (
              CreateLink(links, index)
            ))
          }
        </Grid>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Service")
          }
          {
            SERVICE.map((links, index) => (
              CreateLink(links, index)
            ))
          }
        </Grid>
        <Grid item xs={gridXS} sm={gridSM} md={gridMD} lg={gridLG} sx={gridItemStyle}>
          {
            createHeaderForLinks("Händler / Privat")
          }
          {
            CreateLink("Anmelden", 0, URLs.POST_SIGNIN)
          }
          {
            CreateLink("Registrieren", 1, URLs.POST_SIGINUP)
          }
        </Grid>

        { isVisible &&
        <Suspense fallback={ <div className="loading-component-style">...loading</div> }>
            <LazyIconsComponent />
          </Suspense>
        }
        <Grid>
          
          <DarkMode />


        </Grid>
      </Grid>
      </div>
    </Box>
  )
}
