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

import  CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './themes/ThemeDark';
import Buy from './components/pages/Buy';


function App() {


  return (
    <>
    <BrowserRouter>

      {/* Theme */}
      <ThemeProvider theme={themeColor}>
        {/* dark theme */}
        {/* <CssBaseline /> */}
      <Header />
      <div style={{ backgroundColor: "whitesmoke" }}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* signin */}
        <Route path='/signin' element={<SignIn />} ></Route>
        {/* User signup */}
        <Route path='/signup' element={<SignUpUser />} ></Route> 
        {/* dashboard only admin */}
        <Route path='/dashboard/admin' element={<DashboardAdmin />} ></Route>
        <Route path='/dashboard/service' element={<DashboardService />} ></Route>
        <Route path='/inseratecar' element={<InserateCar />} ></Route>
        <Route path='/kaufen' element={<Buy />} ></Route>
        <Route path='*' element={<Notfound />} ></Route>
      </Routes>
      </div>
      </ThemeProvider>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App