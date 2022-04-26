import React from "react";
import SearchBar from "./SearchBar";

import '../styles/header.css';

const Header = () => {
  return (
    <div className="Header">
      <div className="Content">
        <a className='Logo' />
        <SearchBar />
      </div>
    </div>
  )
};

export default Header;