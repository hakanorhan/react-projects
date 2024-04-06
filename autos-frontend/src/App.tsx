import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/site-components/Header';
import { ThemeProvider } from '@emotion/react';
import themeColor, { minHeightContent } from './themes/ThemeColor';
import Footer from './components/site-components/Footer';
import SignIn from './components/pages/registerLogin/SignIn';
import SignUpUser from './components/pages/registerLogin/SignUp';
import InserateCar from './components/pages/inserate/InserateCar';

// TODO: HomeImage
//import HomeImage from '/home.jpg';

// TODO: Css Baseline
//import CssBaseline from '@mui/material/CssBaseline';
//import darkTheme from './themes/ThemeDark';
import Search from './components/pages/Search';
import { Box } from '@mui/material';

import type { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import DashboardProcess from './components/pages/dashboards/admin/DashboardProcess';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import UploadImage from './components/pages/inserate/UploadImage';
import { Roles } from '../../autos-backend/src/enums/Roles';
import InsertBrand from './components/pages/dashboards/admin/components/InsertBrand';
import { URLs } from '../../autos-backend/src/enums/URLs';
import InsertModel from './components/pages/dashboards/admin/components/InsertModel';
import PublishInserate from './components/pages/dashboards/admin/components/PublishInserate';

const App: React.FC = () => {

  // Background image changes on different components 
  const imageName = useSelector((state: RootState) => state.background.imageName);

  return (
    <>
      {/* Theme */}
      <ThemeProvider theme={themeColor}>
        {/* dark theme */}
        {/* <CssBaseline /> */}
        <Box sx={{  backgroundImage: `url(${imageName}.jpg)`, width: '100%', minHeight: minHeightContent, backgroundColor:'whitesmoke' }}>
          <Header />
          {/* Routes */}
          <Routes>
            <Route path='/' element={<Search />}></Route>
            {/* signin */}
            <Route path='/signin' element={<SignIn />} ></Route>
            {/* User signup */}
            <Route path='/signup' element={<SignUpUser />} ></Route>
            {/* dashboard only admin */}

            <Route path='/inserieren' element={<ProtectedRoute role={Roles.USER}> <InserateCar /> </ProtectedRoute>} />

            <Route path='/admin/writedata' element={<ProtectedRoute role={Roles.ADMIN} ><DashboardProcess /></ProtectedRoute>} ></Route>

            <Route path={ URLs.POST_WRITE_BRAND } element={<ProtectedRoute role={Roles.ADMIN}> <InsertBrand /> </ProtectedRoute>}></Route>
            <Route path={ URLs.POST_INSERT_MODEL } element={<ProtectedRoute role={Roles.ADMIN}> <InsertModel /> </ProtectedRoute>}></Route>
            <Route path={ URLs.FETCH_INSERATE_PUBLISH } element={<ProtectedRoute role={Roles.ADMIN}> <PublishInserate /> </ProtectedRoute>}></Route>

            <Route path='/upload' element={<ProtectedRoute role={Roles.USER}><UploadImage /></ProtectedRoute>}></Route>
            <Route path='*' element={<Navigate to='/signin' replace />} />
          </Routes>

        </Box>
      </ThemeProvider>

      <Footer />
    </>
  )
}

export default App