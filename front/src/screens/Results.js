import React, {useEffect, useState} from "react";
import {get} from "lodash";
import {searchItems} from "../services/api";
import Loading from "../components/Loading";
import ItemCard from "../components/ItemCard";
import {queryState} from "../Recoil/Atoms/query";
import {useSearchParams} from "react-router-dom";
import Categories from "../components/Categories";
import '../styles/results.css';
import {useSetRecoilState} from "recoil";

const Results = () => {
  const [search] = useSearchParams();

  const setQueryState = useSetRecoilState(queryState);

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleSearch = () => {
    if (query !== '') {
      searchItems(query)
        .then(response => {
          setProducts(get(response, 'items', []));
          setCategories(get(response, 'categories', []));
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setQuery(search.get('search'));
  }, [search]);

  useEffect(() => {
    if (query && query !== '') {
      setQueryState(query)
    }
  }, [query])

  useEffect(() => {
    if (query && query !== '') {
      setLoading(true);
      handleSearch(query);
    }
  }, [query]);

  if (loading) return <Loading />;

  return (
    <div className='Results' data-testid="results">
      <Categories categories={categories} />
      <div className='items'>
        {products.map((item, index) => <ItemCard key={index.toString()} item={item}/>)}
      </div>
    </div>
  )
};

export default Results;