import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PrivateRoutes from './routes/PrivateRoutes';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Categories from './pages/Categories';
import Recipes from './pages/Recipies';
import Orders from './pages/Orders';
import Layout from './layout/Layout';





function App() {
  


  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path='/signin' element={<Signin />} />
      <Route path="/" element={<PrivateRoutes />}>
      <Route path="/" element={<Layout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
