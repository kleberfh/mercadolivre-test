import React from 'react';
import {RecoilRoot} from "recoil";
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </RecoilRoot>
  )
};

export default App;