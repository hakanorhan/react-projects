import { Roles, URLs } from './constants/values';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, useMemo} from 'react';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { themeDark, themeLight } from './themes/Theme';
const Header = lazy(() => import('./components/site-components/Header'));
const ProtectedRoute = lazy(() => import('./components/protectedRoutes/ProtectedRoute'));
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material';
const PublishInserate = lazy(() => import('./components/pages/dashboards/admin/components/PublishInserate'));
const Notfound = lazy(() => import('./components/pages/Notfound'));
const Search = lazy(() => import('./components/pages/search/Search'));
const ViewDetailSearch = lazy(() => import('./components/pages/search/viewDetail/ViewDetailSearch'));
const AccessDenied = lazy(() => import('./components/protectedRoutes/AccessDenied'));
const SignIn = lazy(() => import('./components/pages/registerLogin/SignIn'));
const SignUpUser = lazy(() => import('./components/pages/registerLogin/SignUp'));
const InserateCar = lazy(() => import('./components/pages/inserate/InserateCar'));
const InsertBrand = lazy(() => import('./components/pages/dashboards/admin/components/InsertBrand'));
const InsertModel = lazy(() => import('./components/pages/dashboards/admin/components/InsertModel'));
const ListSearchedCars = lazy(() => import('./components/pages/search/ListSearchedCars'));

const App: React.FC = () => {

  const LazyFooter = lazy(() => import('./components/site-components/Footer'));

  const AppLayout = () => (
    <>
      <Toaster />
      <Header />

      <Box sx={{ backgroundColor: 'background.default', minHeight: (window.innerHeight > 1200 ? '1100px' : "calc(100vh - 50px)") }}>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </Box>

        <Suspense fallback={<div>...loading</div>}>
          <LazyFooter />
        </Suspense>

    </>
  )

  // router
  const router = useMemo(() => createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Notfound />,
      children: [
        { path: URLs.POST_SIGNIN, element: <SignIn /> },
        { path: URLs.POST_SIGINUP, element: <SignUpUser /> },
        { path: URLs.HOME_ALL_SEARCH_COUNT, element: <Search /> },
        { path: URLs.POST_INSERATE_CAR, element: <ProtectedRoute role={Roles.USER}><InserateCar /></ProtectedRoute> },
        { path: URLs.FETCH_INSERATE_PUBLISH, element: <ProtectedRoute role={Roles.ADMIN}> <PublishInserate /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_BRAND, element: <ProtectedRoute role={Roles.ADMIN}> <InsertBrand /> </ProtectedRoute> },
        { path: URLs.POST_INSERT_MODEL, element: <ProtectedRoute role={Roles.ADMIN}> <InsertModel /> </ProtectedRoute> },
        { path: URLs.FETCH_DETAIL_SEARCH + "/:id", element: <ViewDetailSearch /> },
        { path: URLs.FETCH_LIST_CARS, element: <ListSearchedCars /> },
      ]
    }, { path: URLs.ACCESS_DENIED, element: <AccessDenied /> }
  ]), []);

  // Background image changes on different components 
  const mode = useSelector((state: RootState) => state.mode.mode);
  const theme = useMemo(() => createTheme(mode ? themeDark : themeLight), [mode]);


  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Routes */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App;