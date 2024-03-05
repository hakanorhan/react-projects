import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/site-components/Header';
import DashboardAdmin from './components/pages/dashboards/DashboardAdmin';
import { ThemeProvider } from '@emotion/react';
import themeColor from './themes/ThemeColor';
import Footer from './components/site-components/Footer';
import SignIn from './components/pages/registerLogin/SignIn';
import SignUpUser from './components/pages/registerLogin/SignUp';
import Notfound from './components/pages/Notfound';
import InserateCar from './components/pages/InserateCar';
import Admin from './components/pages/dashboards/Admin';
import axios from 'axios';

import HomeImage from '/home.jpg';

import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './themes/ThemeDark';
import Search from './components/pages/Search';
import { Box } from '@mui/material';

import type { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import WriteCarData from './components/pages/dashboards/service/WriteCarData';
import ProtectedRoute from './components/ProtectedRoutes';

const App: React.FC = () => {

  // Background image changes on different components 
  const imageName = useSelector((state: RootState) => state.background.imageName);

  return (
    <>
      {/* Theme */}
      <ThemeProvider theme={themeColor}>
        {/* dark theme */}
        {/* <CssBaseline /> */}
        <Box sx={{ backgroundImage: `url(${imageName}.jpg)`, width: '100%', paddingBottom: '4rem' }}>
          <Header />
          {/* Routes */}
          <Routes>
            <Route path='/' element={<Search />}></Route>
            {/* signin */}
            <Route path='/signin' element={<SignIn />} ></Route>
            {/* User signup */}
            <Route path='/signup' element={<SignUpUser />} ></Route>
            {/* dashboard only admin */}

            <Route path='/inserieren' element={<ProtectedRoute> <InserateCar /> </ProtectedRoute>} />

            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/service/writecardata' element={<WriteCarData />} ></Route>
            <Route path='*' element={<Navigate to='/signin' replace />} />
          </Routes>

        </Box>
      </ThemeProvider>

      <Footer />
    </>
  )
}

export default App