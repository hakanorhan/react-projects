import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterAdmin from './components/registerLogin/RegisterAdmin'
import RegisterService from './components/registerLogin/RegisterService'
import Home from './components/Home'
import Header from './components/site-components/Header'
import Dashboard from './components/settings/Dashboard'
import RegisterUser from './components/registerLogin/RegisterUser'
//import RegisterUser from './components/registerLogin/RegisterUser'

function App() {


  return (
    <>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/admin/dashboard' element={<Dashboard />}></Route>
        <Route path='/register-admin' element={<RegisterAdmin />} ></Route>
        <Route path='/register-service' element={<RegisterService />} ></Route>
        <Route path='/signup' element={<RegisterUser />} /> 
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App