import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
const Search = lazy(() => import('./components/pages/search/Search'));
const ViewDetailSearch = lazy(() => import('./components/pages/search/viewDetail/ViewDetailSearch'));
const AccessDenied = lazy(() => import('./components/protectedRoutes/AccessDenied'));
const SignIn = lazy(() => import('./components/pages/registerLogin/SignIn'));
const SignUpUser = lazy(() => import('./components/pages/registerLogin/SignUp'));
const InserateCar = lazy(() => import('./components/pages/inserate/InserateCar'));
const InsertBrand = lazy(() => import('./components/pages/dashboards/admin/components/InsertBrand'));
const InsertModel = lazy(() => import('./components/pages/dashboards/admin/components/InsertModel'));
const ListSearchedCars = lazy(() => import('./components/pages/search/ListSearchedCars'));
const App = () => {
    const AppLayout = () => (_jsxs("div", { children: [_jsx(Header, {}), _jsx("div", { className: 'outlet-content', children: _jsx(Suspense, { fallback: _jsx("div", { children: "...loading" }), children: _jsx(Outlet, {}) }) }), _jsx(Footer, {})] }));
    // router
    const router = createBrowserRouter([
        {
            element: _jsx(AppLayout, {}),
            errorElement: _jsx(Notfound, {}),
            children: [
                { path: URLs.POST_SIGNIN, element: _jsx(SignIn, {}) },
                { path: URLs.POST_SIGINUP, element: _jsx(SignUpUser, {}) },
                { path: URLs.HOME_ALL_SEARCH_COUNT, element: _jsx(Search, {}) },
                { path: URLs.POST_INSERATE_CAR, element: _jsx(ProtectedRoute, { role: Roles.USER, children: _jsx(InserateCar, {}) }) },
                { path: URLs.FETCH_INSERATE_PUBLISH, element: _jsxs(ProtectedRoute, { role: Roles.ADMIN, children: [" ", _jsx(PublishInserate, {}), " "] }) },
                { path: URLs.POST_INSERT_BRAND, element: _jsxs(ProtectedRoute, { role: Roles.ADMIN, children: [" ", _jsx(InsertBrand, {}), " "] }) },
                { path: URLs.POST_INSERT_MODEL, element: _jsxs(ProtectedRoute, { role: Roles.ADMIN, children: [" ", _jsx(InsertModel, {}), " "] }) },
                { path: URLs.FETCH_DETAIL_SEARCH + "/:id", element: _jsx(ViewDetailSearch, {}) },
                { path: URLs.FETCH_LIST_CARS, element: _jsx(ListSearchedCars, {}) },
            ]
        }, { path: URLs.ACCESS_DENIED, element: _jsx(AccessDenied, {}) }
    ]);
    // Background image changes on different components 
    //const mode = useSelector((state: RootState) => state.mode.mode);
    return (_jsx(_Fragment, { children: _jsx(ThemeProvider, { theme: themeLight, children: _jsxs("div", { children: [_jsx(Toaster, {}), _jsx(RouterProvider, { router: router })] }) }) }));
};
export default App;
