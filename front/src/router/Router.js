import React from 'react';
import Header from "../components/Header";
import {Routes, Route} from 'react-router-dom';
import Home from "../screens/Home";
import Results from "../screens/Results";
import Details from "../screens/Details";

const Router = () => {
  return (
    <div className='Router'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/items' element={<Results />}/>
        <Route path='/items/:id' element={<Details />}/>
      </Routes>
    </div>
  );
};

export default Router;