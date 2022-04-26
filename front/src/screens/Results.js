import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {productsState} from "../Recoil/Atoms/products";
import {searchItems} from "../services/api";
import {get} from "lodash";
import ItemCard from "../components/ItemCard";
import '../styles/results.css';

const Results = () => {
  const [search] = useSearchParams();

  const [query, setQuery] = useState('');
  const [products, setProducts] = useRecoilState(productsState);

  const handleSearch = () => {
    if (query !== '') {
      searchItems(query)
        .then(response => {
          setProducts(get(response, 'items', []));
        });
    }
  };

  useEffect(() => {
    setQuery(search.get('search'));
  }, [search]);

  useEffect(() => {
    if (query && query !== '') {
      handleSearch(query);
    }
  }, [query]);

  return (
    <div className='Results'>
      <div className='items'>
        {products.map((item, index) => <ItemCard key={index.toString()} item={item} />)}
      </div>
    </div>
  )
};

export default Results;