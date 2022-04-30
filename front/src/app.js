import React from 'react';
import {RecoilRoot} from "recoil";
import Router from "./router/Router";
import {BrowserRouter} from "react-router-dom";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  )
};

export default App;