import React, {useEffect, useState} from "react";
import {get} from "lodash";
import {useRecoilState} from "recoil";
import {searchItems} from "../services/api";
import Loading from "../components/Loading";
import ItemCard from "../components/ItemCard";
import {useSearchParams} from "react-router-dom";
import {productsState} from "../Recoil/Atoms/products";

import '../styles/results.css';

const Results = () => {
  const [search] = useSearchParams();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useRecoilState(productsState);

  const handleSearch = () => {
    if (query !== '') {
      searchItems(query)
        .then(response => {
          setProducts(get(response, 'items', []));
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setQuery(search.get('search'));
  }, [search]);

  useEffect(() => {
    if (query && query !== '') {
      setLoading(true);
      handleSearch(query);
    }
  }, [query]);

  if (loading) return <Loading />;

  return (
    <div className='Results' data-testid="results">
      <div className='items'>
        {products.map((item, index) => <ItemCard key={index.toString()} item={item}/>)}
      </div>
    </div>
  )
};

export default Results;