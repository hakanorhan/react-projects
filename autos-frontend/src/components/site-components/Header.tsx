import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { primaryColorMain } from '../../themes/ThemeColor';
import { Company } from '../../constants/Company';
import { Link, useNavigate } from 'react-router-dom';
import { Roles } from '../../../../autos-backend/src/enums/Roles';

import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const drawerFontSize = '28px';

const drawerSizes = { color: primaryColorMain, fontSize: drawerFontSize, fontWeight:'bold', paddingLeft:'25px' };
const LinkDrawer = { color: primaryColorMain, textDecoration: 'none'};


export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const loggedIn = useSelector((state: RootState) => state.userLoggedIn.userLoggedIn);
  const role = useSelector((state: RootState) => state.userLoggedIn.role)

  const handleHamburgerMenu = () => {
    setDrawerOpen(true);
  }

  const handleOnCloseDrawer = () => {
    setDrawerOpen(false);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DrawerMenuComponent = () => {
    return <Drawer anchor='right' open={ drawerOpen } onClose={ handleOnCloseDrawer }>
      <Box p={2} sx={{ width: {xs: '100vw', sm:'500px'} }} role='presentation'>
        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'end', paddingTop:'20px' }}>
        <IconButton onClick={() => { setDrawerOpen(false) }}  sx={{ backgroundColor:'transparent', "&.MuiButtonBase-root:hover": {
                backgroundColor: "transparent"
              } }}>
        <CloseOutlinedIcon sx={{ color: primaryColorMain, fontSize: '70px', fontWeight: 'bold', marginRight:'40px', borderStyle:'solid', borderRadius:'5px', padding:'10px'}}/>
        </IconButton>
        </Box>
        <List>

        <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/'>Suchen</Link>} primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/inserieren'>Inserieren</Link>} primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/'>Mein Profil</Link>} primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/our-service'>Unser Service</Link>} primaryTypographyProps={ drawerSizes } />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  }

  const handleMenuRole = () => {
    handleClose();
    switch(role) {
      case Roles.ADMIN:
        break;
      case Roles.USER:
        navigate("/inserieren");
        break;
      default:
        navigate("/signin");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} position="static" sx={{ backgroundColor:'transparent', color: primaryColorMain }}>
        <DrawerMenuComponent />
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHamburgerMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration:'none', color:primaryColorMain, letterSpacing:'0.1rem' }} to='/'>{ Company.COMPANYNAME }</Link>
          </Typography>
         
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={ handleMenuRole }>{ (role === Roles.ADMIN) ? "Dashboard" : "Inserieren" }</MenuItem>
                <MenuItem onClick={(() => { handleClose(); (loggedIn) ? navigate('/signin') : navigate('/signin'); })}> { loggedIn ? "Abmelden" : "Anmelden" }</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}