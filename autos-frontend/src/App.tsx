import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterAdmin from './components/registerLogin/SignUpUser'
import Home from './components/Home'
import Header from './components/site-components/Header'
import Dashboard from './components/settings/Dashboard'
import { ThemeProvider } from '@emotion/react'
import themeColor from './themes/ThemeColor'
import Footer from './components/site-components/Footer'
import SignIn from './components/registerLogin/SignIn'
import SignUpUser from './components/registerLogin/SignUpUser';

function App() {


  return (
    <>
    <BrowserRouter>

      {/* Theme */}
      <ThemeProvider theme={themeColor}>
      <Header />
      <div style={{ backgroundColor:'whitesmoke' }}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/admin/dashboard' element={<Dashboard />}></Route>
        <Route path='/register-admin' element={<RegisterAdmin />} ></Route>
        {/* signin */}
        <Route path='/signin' element={<SignIn />} />
        {/* User signup */}
        <Route path='/signup' element={<SignUpUser />} /> 
      </Routes>
      </div>
      </ThemeProvider>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App