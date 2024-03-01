import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/site-components/Header';
import DashboardAdmin from './components/pages/dashboards/DashboardAdmin';
import DashboardService from './components/pages/dashboards/DashboardService';
import { ThemeProvider } from '@emotion/react';
import themeColor from './themes/ThemeColor';
import Footer from './components/site-components/Footer';
import SignIn from './components/pages/registerLogin/SignIn';
import SignUpUser from './components/pages/registerLogin/SignUp';
import Notfound from './components/pages/Notfound';
import InserateCar from './components/pages/InserateCar';
import AdminDeactivate from './components/pages/dashboards/AdminDeactivate';
import Admin from './components/pages/dashboards/Admin';

import HomeImage from '/home.jpg';

import  CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './themes/ThemeDark';
import Buy from './components/pages/Search';
import { Box } from '@mui/material';


function App() {


  return (
    <>
    <BrowserRouter>

      {/* Theme */}
      <ThemeProvider theme={themeColor}>
        {/* dark theme */}
        {/* <CssBaseline /> */}
      <Box sx={{ backgroundImage: `url(${HomeImage})`, width: '100%', height: {xs: '720px', sm:'580px', md:'510px'} }}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* signin */}
        <Route path='/signin' element={<SignIn />} ></Route>
        {/* User signup */}
        <Route path='/signup' element={<SignUpUser />} ></Route> 
        {/* dashboard only admin */}
        <Route path='/admin/create' element={<DashboardAdmin />} ></Route>
        <Route path='/admin/deactivate' element={<AdminDeactivate />}></Route>
        <Route path='/dashboard/service' element={<DashboardService />} ></Route>
        <Route path='/inserieren' element={<InserateCar />} ></Route>
        <Route path='/suchen' element={<Buy />} ></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='*' element={<Notfound />} ></Route>
      </Routes>
      </Box>
      </ThemeProvider>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App