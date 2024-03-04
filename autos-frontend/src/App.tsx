import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { useEffect } from 'react';

function App() {

  // Background image changes on different components 
  const imageName = useSelector((state: RootState) => state.background.imageName);

  const [authenticated, setAuthenticated] = useState<boolean | undefined>(false);


  const fetchAuth = async () => {
    try {
      await axios.get('http://localhost:3001/api/checkauth', { withCredentials: true })
        .then(response => {
          console.log("ausgabe")
          setAuthenticated(response.data.authenticated)
        })
        .catch(error => setAuthenticated(false))

    } catch (error) {
      setAuthenticated(false)
    }
  }

  useEffect(() => {
    fetchAuth();
  }, [])

  const RouteComponent = () => {
    return <Routes><Route path='/' element={<Search />}></Route>
      {/* signin */}
      <Route path='/signin' element={<SignIn />} ></Route>
      {/* User signup */}
      <Route path='/signup' element={<SignUpUser />} ></Route>
      {/* dashboard only admin */}
      <Route path='/admin/create' element={authenticated ? <DashboardAdmin /> : <SignIn />} ></Route>
      <Route path='/inserieren' element={authenticated ? <InserateCar /> : <SignIn />} ></Route>
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/service/writecardata' element={<WriteCarData />} ></Route>
      <Route path='*' element={<Notfound />} ></Route>
    </Routes>
  }

  return (
    <>
      <BrowserRouter>

        {/* Theme */}
        <ThemeProvider theme={themeColor}>
          {/* dark theme */}
          {/* <CssBaseline /> */}
          <Box sx={{ backgroundImage: `url(${imageName}.jpg)`, width: '100%', paddingBottom: '4rem' }}>
            <Header />
            {/* Routes */}
            <RouteComponent />

          </Box>
        </ThemeProvider>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App