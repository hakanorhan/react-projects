import React, { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';

import { Box, CircularProgress } from '@mui/material';
import type { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import { Roles } from '../../autos-backend/src/enums/Roles';
import { URLs } from './enums/URLs';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Header from './components/site-components/Header';
import { ThemeProvider } from '@emotion/react';
import { themeDark, themeLight } from './themes/Theme';
import Search from './components/pages/search/Search';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
const PublishInserate = lazy(() => import('./components/pages/dashboards/admin/components/PublishInserate'));
const Notfound = lazy(() => import('./components/pages/Notfound'));

const ViewDetailSearch = lazy(() => import('./components/pages/search/viewDetail/ViewDetailSearch'));
const AccessDenied = lazy(() => import('./components/protectedRoutes/AccessDenied'));
const SignIn = lazy(() => import('./components/pages/registerLogin/SignIn'));
const SignUpUser = lazy(() => import('./components/pages/registerLogin/SignUp'));
const InserateCar = lazy(() => import('./components/pages/inserate/InserateCar'));
const InsertBrand = lazy(() => import('./components/pages/dashboards/admin/components/InsertBrand'));
const InsertModel = lazy(() => import('./components/pages/dashboards/admin/components/InsertModel'));
const ListSearchedCars = lazy(() => import('./components/pages/search/ListSearchedCars'));
const Footer = lazy(() => import ('./components/site-components/Footer'));

const App: React.FC = () => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // IntersectionObserver to detect visibility of the footer
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    // Observe the footer element
    const footerElement = document.getElementById('footer');
    if (footerElement) observer.observe(footerElement);

    // Cleanup observer on component unmount
    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  const AppLayout = () => (
    <Box sx={{ width: '100%' }}>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 50px)' }}>
        <Suspense fallback={<Box display={'flex'} justifyContent={'center'} width={'100%'} height={'100vh'}><CircularProgress /></Box>}>
          <Outlet />
        </Suspense>
      </Box>

      <div>
      
      <Suspense fallback={<div>Loading...</div>}>
        {isVisible && <Footer />}
      </Suspense>

      <div id="footer" style={{ height: '1px' }} />
    </div>

    </Box>
  )

  // router
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Notfound />,
      children: [
        { path: URLs.HOME_ALL_SEARCH_COUNT, element: <Search /> },
        { path: URLs.POST_SIGINUP, element: <SignUpUser />},
        { path: URLs.POST_SIGNIN, element: <SignIn /> },
        { path: URLs.POST_INSERATE_CAR, element: <ProtectedRoute role={Roles.USER}><InserateCar /></ProtectedRoute> },
        { path: URLs.FETCH_INSERATE_PUBLISH, element: <ProtectedRoute role={Roles.ADMIN}> <PublishInserate /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_BRAND, element: <ProtectedRoute role={Roles.ADMIN}> <InsertBrand /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_MODEL, element: <ProtectedRoute role={Roles.ADMIN}> <InsertModel /> </ProtectedRoute> },
        { path: URLs.FETCH_DETAIL_SEARCH + "/:id", element: <ViewDetailSearch />},
        { path: URLs.FETCH_LIST_CARS, element: <ListSearchedCars />},
      ]
    }, { path: URLs.ACCESS_DENIED, element: <AccessDenied /> }
  ]);

  // Background image changes on different components 
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <>
      {/* Theme */}
      <ThemeProvider theme={mode ? themeDark : themeLight}>
        <Box sx={{ backgroundColor:'background.default' }}>
          {/* Routes */}
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App;