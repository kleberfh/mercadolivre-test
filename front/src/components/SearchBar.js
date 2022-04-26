import React, {useState} from 'react';
import { BsSearch } from "react-icons/bs";
import {searchItems} from "../services/api";
import '../styles/SearchBar.css';
import {useSetRecoilState} from "recoil";
import {productsState} from "../Recoil/Atoms/products";
import {get} from "lodash";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const setProducts = useSetRecoilState(productsState);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query !== '') {
      searchItems(query)
        .then(response => {
          setProducts(get(response, 'items', []));
        })
    }
  }

  return (
    <form
      className="SearchBar"
      onSubmit={handleSearch}
    >
      <input
        className='search'
        placeholder="Nunca deixa de buscar"
        onChange={e => setQuery(e.target.value)}
      />
      <button
        className='button'
        onClick={handleSearch}
      >
        <BsSearch
          color='#2c2c2c'
          className='icon'
        />
      </button>
    </form>
  )
};

export default SearchBar;