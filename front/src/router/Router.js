import React from 'react';
import Header from "../components/Header";
import {Routes, Route} from 'react-router-dom';
import Home from "../screens/Home";
import Results from "../screens/Results";

const Router = () => {
  return (
    <div className='Router'>
      <Header />
      <Routes>
        <Route path='/items' element={<Results />}/>
        <Route exact path='/' element={<Home />}/>
      </Routes>
    </div>
  );
};

export default Router;