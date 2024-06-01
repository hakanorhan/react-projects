import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Roles } from '../../enums/Roles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LinkDrawer, LinkHome, ParagraphSideMenu, fontBold } from '../../themes/Theme';
import type { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import { URLs } from '../../enums/URLs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setRole, setUserLoggedIn } from '../../redux/features/userlogged';
import { AuthResponse } from '../../interfaces/types';
import { notifyError } from '../../helper/toastHelper';
import { Toaster } from 'react-hot-toast';

const headlineStyle = { color: 'secondary.contrastText', paddingLeft: '20px', justifyContent: 'flex-start' };

const drawerFontSize = '28px';

const drawerSizes = { color: 'secondary.contrastText', fontSize: drawerFontSize, fontFamily: fontBold, paddingLeft: '25px' };
const accordionIconStyle = { fontSize: drawerFontSize, color:'secondary.contrastText' };
const accordionStyle = { backgroundColor:'secondary.main', paddingLeft: '25px', marginBottom: '0.8rem' };

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
        //alert("Login status: " + logged + " Rolle: " + authRole);

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
        navigate(URLs.HOME_ALL_SEARCH_COUNT);
      } catch (error: any) {
        const message = error.response.data.message;
        notifyError(message, message);
      }
    } else {
      navigate(URLs.POST_SIGNIN);
    }
  }

  // -------------------------------------- ADMIN ----------------------------------------------------------

  const AccordionComponent: React.FC<AccordionProps> = ({icon, title, urlBrand, urlModel}) => {
    return <Accordion elevation={0} sx={accordionStyle}>
    <AccordionSummary
      expandIcon={ <ExpandMoreIcon sx={{ color: 'secondary.contrastText' }}/> }
      aria-controls="panel1-content"
      id="panel1-header"
    >
      { icon } <ParagraphSideMenu><Typography sx={{ color: 'secondary.contrastText' }} variant='h6'>{ title }</Typography></ParagraphSideMenu>
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
  </Accordion>
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
            backgroundColor: 'transparent', "&.MuiButtonBase-root:hover": {
              backgroundColor: "transparent"
            }
          }}>
            <CloseOutlinedIcon sx={{ color: 'primary.main', "&:hover": { border: '0px' }, fontSize: '70px', marginRight: '40px', borderStyle: 'solid', borderRadius: '5px', padding: '10px' }} />
          </IconButton>
        </Box>
          <List>

            <ListItemLink title='Suchen' url={URLs.HOME_ALL_SEARCH_COUNT} />
            { role === Roles.USER || role === Roles.NULL ?
            <ListItemLink title='Inserieren' url={URLs.POST_INSERATE_CAR} />
            : null
            }
          </List>
        
        {role === Roles.ADMIN &&
          <> <hr />
            <Box sx={{ marginTop: '1rem' }}>
              <AccordionComponent icon={<AddIcon sx={ accordionIconStyle } />} title={"Hinzufügen"} urlBrand={URLs.POST_INSERT_BRAND} urlModel={URLs.POST_INSERT_MODEL} />
              
              <Button onClick={() => {
                setDrawerOpen(false); navigate(URLs.FETCH_INSERATE_PUBLISH)
              }} sx={{ width:'250px', color:'secondary.contrastText', '&:hover': { color: 'secondary.contrastText' }, marginTop: '0.8rem' }}  startIcon={<PublishIcon sx={ accordionIconStyle }/>}> <Typography>Veröffentlichen </Typography></Button>
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