import React, {useEffect, useState} from "react";
import {get} from "lodash";
import {getItem} from "../services/api";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";
import {convertIntToMoney, getProductImage} from "../utilities/utilities";

import '../styles/details.css';
import Categories from "../components/Categories";

const Details = () => {
  const params = useParams();

  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    getItem(id)
      .then(response => {
        setProduct(get(response, 'item', null));
        setLoading(false);
      })
  }

  const fixedProductPrice = () => {
    const amount = get(product, 'price.amount', '');
    const decimals = get(product, 'price.decimals', 0);

    let fixedAmount = amount;

    if (decimals === 0) {
      fixedAmount = Number(amount + '00')
    }

    const formatedPrice = convertIntToMoney(
      fixedAmount
        .toString()
        .replace('.', ''),
      get(product, 'price.currency', 'BRL')
    )
    .split(',');

    return {
      price: formatedPrice[0],
      decimals: formatedPrice[1]
    }
  }

  useEffect(() => {
    setLoading(true);
    setId(get(params, 'id', ''))
  }, [params])

  useEffect(() => {
    if (id && id !== '') {
      getProduct();
    }
  }, [id])

  if (loading) return <Loading />;

  return (
    <div className='DetailContainer'>
      <Categories categories={get(product, 'categories', '')} />
      <div className='ProductContainer'>
        <div className='Product'>
          <img
            className='ProductImage'
            src={getProductImage(get(product, 'thumbnail_id', null), get(product, 'picture', ''))}
          />
          <div className='ProductInfoContainer'>
            {product.sold_quantity >= 1 && (
              <span className='ProductConditionSales'>
              {`${product.condition} - ${product.sold_quantity} vendidos`}
            </span>
            )}
            <span className='ProductTitle'>
            {product.title}
          </span>
            <div className='ProductPriceContainer'>
            <span className='ProductPrice'>
              {fixedProductPrice().price}
            </span>
              <span className='ProductPriceDecimals'>
              {fixedProductPrice().decimals}
            </span>
            </div>
            <a
              target='_blank'
              rel='noreferrer noopener'
              className='ProductPurchaseButton'
              href={get(product, 'link', '')}
            >
              Comprar
            </a>
          </div>
        </div>
        <div className='DescriptionContainer'>
        <span className='DescriptionTitle'>
          Descripción del producto
        </span>
          <span className='DescriptionContent'>
          {product.description}
        </span>
        </div>
      </div>
    </div>
  )
}

export default Details