import React from 'react';
import './App.css';
import Header from './components/site-components/Header';
import { ThemeProvider } from '@emotion/react';
import { themeDark, themeLight } from './themes/Theme';
import Footer from './components/site-components/Footer';
import SignIn from './components/pages/registerLogin/SignIn';
import SignUpUser from './components/pages/registerLogin/SignUp';
import InserateCar from './components/pages/inserate/InserateCar';

import Search from './components/pages/search/Search';
import { Box } from '@mui/material';
import './App.css'

import type { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import { Roles } from '../../autos-backend/src/enums/Roles';
import InsertBrand from './components/pages/dashboards/admin/components/InsertBrand';
import { URLs } from '../../autos-backend/src/enums/URLs';
import InsertModel from './components/pages/dashboards/admin/components/InsertModel';
import PublishInserate from './components/pages/dashboards/admin/components/PublishInserate';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Notfound from './components/pages/Notfound';
import ListSearchedCars from './components/pages/search/ListSearchedCars';
import ViewDetailSearch from './components/pages/search/viewDetail/ViewDetailSearch';

const App: React.FC = () => {

  const AppLayout = () => (
    <Box sx={{ width: '100%' }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )

  // router
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: URLs.POST_SIGINUP, element: <SignUpUser />, errorElement: <Notfound /> },
        { path: URLs.POST_SIGNIN, element: <SignIn />, errorElement: <Notfound /> },
        { path: URLs.POST_INSERATE_CAR, element: <ProtectedRoute role={Roles.USER}><InserateCar /></ProtectedRoute>, errorElement: <Notfound /> },
        { path: URLs.FETCH_INSERATE_PUBLISH, element: <ProtectedRoute role={Roles.ADMIN}> <PublishInserate /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_BRAND, element: <ProtectedRoute role={Roles.ADMIN}> <InsertBrand /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_MODEL, element: <ProtectedRoute role={Roles.ADMIN}> <InsertModel /> </ProtectedRoute> },
        { path: URLs.FETCH_DETAIL_SEARCH + "/:id", element: <ViewDetailSearch />, errorElement: <Notfound /> },
        { path: URLs.HOME_ALL_SEARCH_COUNT, element: <Search /> },
        { path: URLs.FETCH_LIST_CARS, element: <ListSearchedCars /> },
      ]
    }
  ]);

  // Background image changes on different components 
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <>
      {/* Theme */}
      <ThemeProvider theme={mode ? themeDark : themeLight}>
        <Box sx={{ backgroundColor:'background.default' }}>
          {/* Routes */}
          <RouterProvider router={router} fallbackElement={<Notfound />} />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App;