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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Company } from '../../constants/Company';
import { Link } from 'react-router-dom';
import { primaryColorMain } from '../../themes/ThemeColor';


const pages = ['Kaufen', 'Verkaufen', 'Blog'];
const settings = ['Account', 'Dashboard', 'Logout'];

const linkColorHeaderXS: string = primaryColorMain;
const linkColorHeaderLG: string = 'white';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const DesktopIconMenu = () => {
    return <>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', lg: 'flex' },
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
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: linkColorHeaderLG }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ color: linkColorHeaderXS }} to={`/${page}`}>{page}</Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', lg: 'none' },
              flexGrow: 1,
              fontFamily: '',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: linkColorHeaderLG
            }}
          >
            { Company.COMPANYNAME }
          </Typography></>
  }

  const DesktopLink = () => {
    return <>
      { /* Desktop */ }
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page}
                onClick={handleCloseNavMenu}
                style={{ marginBottom: 2, display: 'block', textDecoration: 'none', paddingLeft:'1rem', color: linkColorHeaderLG }}
                to={`/${page}`}
              >
                {page}
              </Link>
            ))}
          </Box>
    </>
  }

  return (
    <AppBar position="static">
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <DesktopIconMenu />

          <HamburgerMenuIcon />
          <DesktopLink />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleIcon sx={{ color: linkColorHeaderLG }} fontSize='large'/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;