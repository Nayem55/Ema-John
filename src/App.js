import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { useState} from "react";
import {Routes,Route} from 'react-router-dom'
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';
import Purchase from './components/Purchase/Purchase';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {
  const [open , setOpen] = useState(false)
  return (
    <div>
    <Header open={open} setOpen={setOpen}></Header>
    <Routes>
      <Route path='/' element={<Shop  open={open}></Shop>}></Route>
      <Route path='/shop' element={<Shop  open={open}></Shop>}></Route>
      <Route path='/orders' element={<Orders open={open}/>}></Route>
      <Route path='/inventory' element={<Inventory/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/purchase' element={<RequireAuth> <Purchase/> </RequireAuth>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    
    </div>
  );
}

export default App;
