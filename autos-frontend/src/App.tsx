import './App.css';

//import type { RootState } from './redux/store';
//import { useSelector } from 'react-redux';
import { Roles, URLs } from './constants/values';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
//import { useSelector } from 'react-redux';
//import { RootState } from './redux/store';
//import { themeLight } from './themes/Theme';

import Header from './components/site-components/Header';
import Footer from './components/site-components/Footer';
import { themeLight } from './themes/Theme';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
const PublishInserate = lazy(() => import('./components/pages/dashboards/admin/components/PublishInserate'));
const Notfound = lazy(() => import('./components/pages/Notfound'));
const Search = lazy(() => import ('./components/pages/search/Search'));
const ViewDetailSearch = lazy(() => import('./components/pages/search/viewDetail/ViewDetailSearch'));
const AccessDenied = lazy(() => import('./components/protectedRoutes/AccessDenied'));
const SignIn = lazy(() => import('./components/pages/registerLogin/SignIn'));
const SignUpUser = lazy(() => import('./components/pages/registerLogin/SignUp'));
const InserateCar = lazy(() => import('./components/pages/inserate/InserateCar'));
const InsertBrand = lazy(() => import('./components/pages/dashboards/admin/components/InsertBrand'));
const InsertModel = lazy(() => import('./components/pages/dashboards/admin/components/InsertModel'));
const ListSearchedCars = lazy(() => import('./components/pages/search/ListSearchedCars'));

const App: React.FC = () => {

  const AppLayout = () => (


    <div>
      <Header />
      
      <div className='outlet-content'>
      <Suspense fallback={<div>...loading</div>}>
          <Outlet />
      </Suspense>
      </div>
      
     <Footer /> 

      
    </div>
  )

  // router
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Notfound />,
      children: [
        { path: URLs.POST_SIGNIN, element: <SignIn /> },
        
        { path: URLs.POST_SIGINUP, element: <SignUpUser />},
        { path: URLs.HOME_ALL_SEARCH_COUNT, element: <Search /> },
        { path: URLs.POST_INSERATE_CAR, element: <ProtectedRoute role={Roles.USER}><InserateCar /></ProtectedRoute> },
        { path: URLs.FETCH_INSERATE_PUBLISH, element: <ProtectedRoute role={Roles.ADMIN}> <PublishInserate /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_BRAND, element: <ProtectedRoute role={Roles.ADMIN}> <InsertBrand /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_MODEL, element: <ProtectedRoute role={Roles.ADMIN}> <InsertModel /> </ProtectedRoute> },
        { path: URLs.FETCH_DETAIL_SEARCH + "/:id", element: <ViewDetailSearch />},
      { path: URLs.FETCH_LIST_CARS, element: <ListSearchedCars />},
      ]
    },  { path: URLs.ACCESS_DENIED, element: <AccessDenied /> }
  ]);

  // Background image changes on different components 
  //const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <>
      {/* Theme */}
      {/* TODO: theme */}
      <ThemeProvider theme={themeLight}>
        {/* TODO: sx={{ backgroundColor:'background.default'  */}
        <div>
          <Toaster/>
          {/* Routes */}
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App;