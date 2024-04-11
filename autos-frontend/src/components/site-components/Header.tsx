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
import { primaryColorMain } from '../../themes/ThemeColor';
import { Company } from '../../constants/Company';
import { Link, useNavigate } from 'react-router-dom';
import { Roles } from '../../../../autos-backend/src/enums/Roles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ParagraphSideMenu } from '../../themes/ThemeColor';

import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import { secondaryColorLight } from '../../themes/ThemeColor';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { URLs } from '../../../../autos-backend/src/enums/URLs';

const headlineStyle = { paddingLeft: '20px', fontSize: { xs: '0.9rem', lg: '1rem' }, color: primaryColorMain, backgroundColor: 'transparent', ':hover': { color: 'orange' }, justifyContent: 'flex-start' };

const drawerFontSize = '28px';

const drawerSizes = { color: primaryColorMain, fontSize: drawerFontSize, fontWeight: 'bold', paddingLeft: '25px' };
const LinkDrawer = { color: primaryColorMain, textDecoration: 'none' };
const expandIconStyle = { color: primaryColorMain };
const accordionIconStyle = { fontSize: drawerFontSize };
const accordionStyle = { color: primaryColorMain, fontSize: drawerFontSize, fontWeight: 'bold', paddingLeft: '25px', marginBottom: '0.8rem' };

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

  const handleMenuRole = () => {
    handleClose();
    switch (role) {
      case Roles.ADMIN:
        break;
      case Roles.USER:
        navigate("/inserieren");
        break;
      default:
        navigate("/signin");
    }
  }

  // -------------------------------------- ADMIN ----------------------------------------------------------
  const AccordionHinzufuegen = () => {
    return <Accordion elevation={0} sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={expandIconStyle} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <AddIcon sx={accordionIconStyle} /> <ParagraphSideMenu>Hinzufügen</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box >
          <Button sx={headlineStyle} onClick={() => { setDrawerOpen(false); navigate(URLs.POST_WRITE_BRAND) }} > Marke </Button>
          <Button sx={headlineStyle} onClick={() => { setDrawerOpen(false); navigate(URLs.POST_INSERT_MODEL) }}> Modell </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  }

  const AccordionUpdate = () => {
    return <Accordion elevation={0} sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={expandIconStyle} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <UpdateIcon sx={accordionIconStyle} /> <ParagraphSideMenu>Aktualisieren</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Modell </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  }

  const AccordionEntfernen = () => {
    return <Accordion elevation={0} sx={accordionStyle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: primaryColorMain }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <DeleteIcon sx={accordionIconStyle} /> <ParagraphSideMenu>Entfernen</ParagraphSideMenu>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Button sx={headlineStyle} > Auto </Button>
          <Button sx={headlineStyle} > Marke </Button>
          <Button sx={headlineStyle} > Modell </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  }

  // -------------------------------------- ADMIN ----------------------------------------------------------

  const DrawerMenuComponent = () => {
    return <Drawer anchor='right' open={drawerOpen} onClose={handleOnCloseDrawer}>
      <Box p={2} sx={{ width: { xs: '100vw', sm: '500px' } }} role='presentation'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', paddingTop: '20px' }}>
          <IconButton onClick={() => { setDrawerOpen(false) }} sx={{
            backgroundColor: 'transparent', "&.MuiButtonBase-root:hover": {
              backgroundColor: "transparent"
            }
          }}>
            <CloseOutlinedIcon sx={{ "&:hover": { backgroundColor: secondaryColorLight, border: '0px' }, color: primaryColorMain, fontSize: '70px', fontWeight: 'bold', marginRight: '40px', borderStyle: 'solid', borderRadius: '5px', padding: '10px' }} />
          </IconButton>
        </Box>
        {role === Roles.USER &&
          <List>

            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/'>Suchen</Link>} primaryTypographyProps={drawerSizes} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/inserieren'>Inserieren</Link>} primaryTypographyProps={drawerSizes} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText primary={<Link style={LinkDrawer} onClick={handleOnCloseDrawer} to='/our-service'>Unser Service</Link>} primaryTypographyProps={drawerSizes} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        }

        {/* ADMIN menu */}
        {role === Roles.ADMIN &&
          <> <hr />
            <Box sx={{ marginTop: '1rem' }}>
              <AccordionHinzufuegen />
              <AccordionUpdate />
              <AccordionEntfernen />

              <Button onClick={() => { setDrawerOpen(false); navigate(URLs.FETCH_INSERATE_PUBLISH) }} sx={{ marginTop: '0.8rem' }} fullWidth variant="outlined" startIcon={<PublishedWithChangesIcon />}> <p>Veröffentlichen </p></Button>
              <Button sx={{ marginTop: '0.8rem' }} fullWidth variant="outlined" startIcon={<UnpublishedIcon />}> <p>AUFHEBEN </p></Button>
            </Box>
          </>
        }
      </Box>
    </Drawer>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} position="static" sx={{ backgroundColor: 'transparent', color: primaryColorMain }}>
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
            <Link style={{ textDecoration: 'none', color: primaryColorMain, letterSpacing: '0.1rem' }} to='/'>{Company.COMPANYNAME}</Link>
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
              <MenuItem onClick={handleMenuRole}>{(role === Roles.ADMIN) ? "Dashboard" : "Inserieren"}</MenuItem>
              <MenuItem onClick={(() => { handleClose(); (loggedIn) ? navigate('/signin') : navigate('/signin'); })}> {loggedIn ? "Abmelden" : "Anmelden"}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}