import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Roles, URLs } from '../../constants/values';
import { LinkDrawer, LinkHome, fontBold } from '../../themes/Theme';
import type { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setRole, setUserLoggedIn } from '../../redux/features/slices';
import { AuthResponse } from '../../interfaces/types';
import { notifyError } from '../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';
import muiLazyLoader from '../../helper/lazyLoading/MuiLazyLoader';


const headlineStyle = { color: 'secondary.contrastText', paddingLeft: '20px', justifyContent: 'flex-start' };
const drawerFontSize = '28px';

const drawerSizes = { color: 'secondary.contrastText', fontSize: drawerFontSize, fontFamily: fontBold, paddingLeft: '25px' };
const accordionIconStyle = { fontSize: drawerFontSize, color:'secondary.contrastText' };
const accordionStyle = { backgroundColor:'secondary.main', paddingLeft: '35px', marginBottom: '0.8rem' };

interface AccordionProps {
  icon: JSX.Element,
  title: string,
  urlBrand: URLs,
  urlModel: URLs
}

interface ListItemLinkProps {
  title: string,
  url: URLs
}

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.userLoggedIn.userLoggedIn);
  const role = useSelector((state: RootState) => state.userLoggedIn.role)

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get<AuthResponse>(URLs.ORIGIN_SERVER + URLs.AUTHENTICATION_USER, { withCredentials: true });
        const authResponse: AuthResponse = response.data;
        const logged = authResponse.authenticated;
        dispatch(setUserLoggedIn(logged));
        const authRole = authResponse.role;
        dispatch(setRole(authRole));

      } catch (error: any) {
        const authResponse: AuthResponse = error.response.data;
        const logged = authResponse.authenticated;
        dispatch(setUserLoggedIn(logged));
        const authRole = authResponse.role;
        dispatch(setRole(authRole));

      }
    }
    checkAuth();
  }, [])

  const handleHamburgerMenu = () => {
    setDrawerOpen(true);
  }

  const handleOnCloseDrawer = () => {
    setDrawerOpen(false);
  }

  const handleMenu = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logoutLogin() {
    if (loggedIn) {
      try {
        axios.delete(URLs.ORIGIN_SERVER + URLs.LOGOUT, { withCredentials: true })
        dispatch(setUserLoggedIn(false));
        dispatch(setRole(Roles.NULL));
        navigate(URLs.HOME_ALL_SEARCH_COUNT);
      } catch (error: any) {
        const message = error.response.data.message;
        notifyError(message, message);
      }
    } else {
      navigate(URLs.POST_SIGNIN);
    }
  }

  const AccordionLazy = muiLazyLoader(() =>
  import('@mui/material/Accordion').then(module => {
    return { default: module.default };
  }),
);

const AccordionSummary = muiLazyLoader(() =>
import('@mui/material/AccordionSummary').then(module => {
  return { default: module.default };
}),
);

const AccordionDetails = muiLazyLoader(() =>
import('@mui/material/AccordionDetails').then(module => {
  return { default: module.default };
}),
);

'@mui/icons-material/ExpandMore'
const ExpandMoreIcon = muiLazyLoader(() =>
import('@mui/icons-material/ExpandMore').then(module => {
  return { default: module.default };
}),
);

const PublishIcon = muiLazyLoader(() =>
import('@mui/icons-material/Publish').then(module => {
  return { default: module.default };
}),
);

const AddIcon = muiLazyLoader(() =>
import('@mui/icons-material/Add').then(module => {
  return { default: module.default };
}),
)
  // -------------------------------------- ADMIN ----------------------------------------------------------

  const AccordionComponent: React.FC<AccordionProps> = ({icon, title, urlBrand, urlModel}) => {
    return <AccordionLazy elevation={0} sx={accordionStyle}>
    <AccordionSummary
      expandIcon={ <ExpandMoreIcon sx={{ color: 'secondary.contrastText' }}/> }
      aria-controls="panel1-content"
      id="panel1-header"
    >
      { icon } <Typography variant='h5' component='h3' sx={{ marginLeft: '0.5rem',color: 'secondary.contrastText' }}>{ title }</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box >
        <Button sx={headlineStyle} onClick={() => {
          // URLs.POST_INSERT_BRAND
          setDrawerOpen(false); navigate( urlBrand )
        }} > Marke </Button>
        
        <Button sx={headlineStyle} onClick={() => {
          // URLs.POST_INSERT_MODEL
          setDrawerOpen(false); navigate( urlModel )
        }}> Modell </Button>
      </Box>
    </AccordionDetails>
  </AccordionLazy>
  }

  const ListItemLink: React.FC<ListItemLinkProps> = ({ title, url }) => {
   return  <ListItem>
    <ListItemButton>
      <ListItemIcon>
        <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to={ url }><Typography sx={drawerSizes}> { title } </Typography></Link>} />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
  }

  // -------------------------------------- ADMIN ----------------------------------------------------------

  const DrawerMenuComponent = () => {
    return <Drawer sx={{ height: '100%' }} anchor='right' open={drawerOpen} onClose={handleOnCloseDrawer}>
      <Box p={2} sx={{ height: '100%', backgroundColor: 'secondary.main', width: { xs: '100vw', sm: '500px' } }} role='presentation'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', paddingTop: '20px' }}>
          <IconButton onClick={() => { setDrawerOpen(false) }} sx={{
            cursor:'pointer',
            backgroundColor: 'transparent', "&.MuiButtonBase-root:hover": {
              backgroundColor: "transparent"
            }
          }}>
            <CloseOutlinedIcon sx={{ color: 'primary.main', "&:hover": { border: '0px' }, fontSize: '70px', marginRight: '40px', borderStyle: 'solid', borderRadius: '5px', padding: '10px' }} />
          </IconButton>
        </Box>
          <List>
            <div>{}</div>
            <ListItemLink title='Suchen' url={URLs.HOME_ALL_SEARCH_COUNT} />
            { role === Roles.USER || role === Roles.NULL ?
            <ListItemLink title='Inserieren' url={ role === Roles.USER ? URLs.POST_INSERATE_CAR : URLs.POST_SIGNIN } />
            : null
            }
          </List>
        
        {role === Roles.ADMIN && loggedIn &&
          <> <hr />
            <Box sx={{ marginTop: '1rem' }}>
              <AccordionComponent icon={<AddIcon sx={ accordionIconStyle } />} title={"Hinzufügen"} urlBrand={URLs.POST_INSERT_BRAND} urlModel={URLs.POST_INSERT_MODEL} />
              
              <Button onClick={() => {
                setDrawerOpen(false); navigate(URLs.FETCH_INSERATE_PUBLISH)
              }} sx={{ width:'250px', color:'secondary.contrastText', '&:hover': { color: 'secondary.contrastText' }, marginTop: '0.8rem', paddingLeft:'55px' }}  startIcon={<PublishIcon sx={ accordionIconStyle }/>}> <Typography  variant='h5' component='h4'>Veröffentlichen </Typography></Button>
               </Box>
          </>
        }
      </Box>
    </Drawer>
  }

  return (<>
    <Toaster />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: 'primary.main' }} elevation={2} position="static" >
        <DrawerMenuComponent />
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'primary.contrastText' }}
            onClick={handleHamburgerMenu}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: '100%' }}>
            <LinkHome to={URLs.HOME_ALL_SEARCH_COUNT}>  <Typography variant="h6" component="div" sx={{ flexGrow: 1, }}> {"cars"} </Typography> </LinkHome>
          </Box>

          <div>
            <IconButton
              sx={{ color: 'primary.contrastText' }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle sx={{ color: 'primary.contrastText' }} />
            </IconButton>
            <Menu sx={{ mt: '55px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { logoutLogin(); handleClose() }}>{(loggedIn) ? "Abmelden" : "Anmelden"}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  </>
  );
}