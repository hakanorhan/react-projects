import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// icons
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import CarRentalOutlinedIcon from '@mui/icons-material/CarRentalOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { Company } from '../../constants/Company';
import { Link } from 'react-router-dom';
import { primaryColorMain } from '../../themes/ThemeColor';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const pages = ['Kaufen', 'Verkaufen', 'Blog'];
const settings = ['Account', 'Dashboard', 'Logout'];

const linkColorHeaderXS: string = primaryColorMain;
const linkColorHeaderLG: string = 'white';

const fontSizeIcons = '40px';
const drawerFontSize = '28px';

const drawerSizes = { fontSize: drawerFontSize, fontWeight:'bold', paddingLeft:'25px' };

function Header() {
  const [accountMenuState, setAccountMenuState] = React.useState<null | HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleHamburgerMenu = () => {
    setDrawerOpen(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuState(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAccountMenuState(null);
  };

  const handleOnCloseDrawer = () => {
    setDrawerOpen(false);
  }

  const DesktopIconMenu = () => {
    return <>
          <Typography
            variant="h6"
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: linkColorHeaderLG
            }}
          >
            {Company.COMPANYNAME}
          </Typography>
    </>
  }

  const HamburgerMenuIcon = () => {
    return <>
    {/* Hamburger Menu */}
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleHamburgerMenu}
              sx={{ color: linkColorHeaderLG }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
         </>
  }

  const AccountMenu = () => {
    return <Box sx={{ }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleIcon sx={{ color: linkColorHeaderLG, fontSize: { xs: '20px', lg: '25px'} }}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={accountMenuState}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(accountMenuState)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
  }

  const DrawerMenuComponent = () => {
    return <Drawer anchor='right' open={ drawerOpen } onClose={ handleOnCloseDrawer }>
      <Box p={2} sx={{ width: {xs: '100vw', sm:'500px'} }} role='presentation'>
        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'end', paddingTop:'20px' }}>
        <IconButton sx={{ backgroundColor:'transparent', "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              } }}>
        <CloseOutlinedIcon onClick={() => { setDrawerOpen(false) }} sx={{ color: primaryColorMain, fontSize: '70px', fontWeight: 'bold', marginRight:'40px', borderStyle:'solid', borderRadius:'5px', padding:'10px' }}/>
        </IconButton>
        </Box>
        <List>

        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CarRentalOutlinedIcon sx={{ fontSize: fontSizeIcons }}/>
                <ListItemText primary='Rent' primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ fontSize: fontSizeIcons }}/>
                <ListItemText primary='Account' primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LocalParkingOutlinedIcon sx={{ fontSize: fontSizeIcons }}/>
                <ListItemText primary='Unsere Flotte' primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnOutlinedIcon sx={{ fontSize: fontSizeIcons }}/>
                <ListItemText primary='Standorte' primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Container maxWidth='xl' sx={{flexDirection:'row' }}>
        <DrawerMenuComponent />
        <Toolbar disableGutters sx={{ width:'100%', display:'flex', flexDirection:'row'}}>
        <HamburgerMenuIcon />
          <DesktopIconMenu />
          <AccountMenu />
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;