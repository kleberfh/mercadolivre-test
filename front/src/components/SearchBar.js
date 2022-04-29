import React, {useState} from 'react';
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query !== '') {
      navigate({
        pathname: '/items',
        search: `?search=${encodeURI(query)}`,
      });
    }
  };

  return (
    <form
      className="SearchBar"
      onSubmit={handleSearch}
    >
      <input
        className='search'
        placeholder="Nunca dejes de buscar"
        onChange={e => setQuery(e.target.value)}
      />
      <button
        className='button'
        onClick={handleSearch}
      >
        <BsSearch
          color='#4f5151'
          className='icon'
        />
      </button>
    </form>
  )
};

export default SearchBar;