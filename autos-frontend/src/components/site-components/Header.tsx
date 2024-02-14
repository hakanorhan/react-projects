import { Link } from "react-router-dom";

import {
    useState,
    MouseEvent
} from "react";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { grey } from '@mui/material/colors';
import RegisterUser from "../registerLogin/SignIn";
const blackColor = grey[900];

/* Redux imports */


export default function Header() {

    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /** If user clicks on Account icon and if user is logged in */
    function MenuAccountSettings() {
        // user, admin, service is logged
        return <Menu
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
                <Typography textAlign="center">
                    <Link to="/admin/dashboard" style={{ textDecoration: 'none', color:'black' }}> {setting} </Link>
                </Typography>
            </MenuItem>
        ))}
    </Menu>
    }

    /**
     * 
     * @returns Account icon with setting menu items or Link to dashboard
     */
    function LoggerProcess() {
        if(true) {
            return <> 
            <Tooltip title="Account">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white", fontSize: 'inherit'}} />
                    
                {/*
                // if login safe
                <Avatar sx={{ height: '40px', width: '40px' }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        */ }
                </IconButton>
        </Tooltip>
        <MenuAccountSettings/>
        </>
        } else {
            return <Link to="/signin">
             <AccountCircle sx={{ color: 'white', fontSize: '30px'}} />
             </Link>
             
        }
    }

    return (
        <AppBar sx={{  backgroundColor: blackColor }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                    CARS   
                    </Typography>
                    {/*/ Hamburger menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {/* Hamburger Menu */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{ color: 'white' }}
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: "white",
                            textDecoration: 'none',
                        }}
                    >
                        CARS
                    </Typography>

                    {/* Nav menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        { /* determines which process should be carried
                           * showing menu items or
                           * routes to signin
                           */ }
                        <LoggerProcess />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}
