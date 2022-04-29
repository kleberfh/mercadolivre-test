import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {get} from "lodash";
import {getItem} from "../services/api";
import Loading from "../components/Loading";

const Details = () => {
  const params = useParams();

  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const getProduct = () => {
    getItem(id)
      .then(response => {
        console.log(response.item);
        setProduct(get(response, 'item', null));
        setLoading(false);
      })
  }

  useEffect(() => {
    setId(get(params, 'id', ''))
  }, [])

  useEffect(() => {
    if (id && id !== '') {
      getProduct();
    }
  }, [id])

  if (loading) return <Loading />;

  return (
    <div className='DetailContainer'>
      <div className='Product'>
        <img src={product.picture} className='ProductImage' />
        <div className='ProductInfoContainer'>
          <span className='ProductConditionSales'>
            {`${product.condition} - ${product.sold_quantity} vendidos`}
          </span>
          <span className='ProductTitle'>
            {product.title}
          </span>
          <div className='ProductPriceContainer'>
            <span className='ProductPriceContainer'>
              $ {(get(product, 'price.amount', null)).toString().split('.')[0]}
            </span>
            <span className='ProductPriceDecimals'>
              {get(product, 'price.decimals', null)}
            </span>
          </div>
          <button className='ProductPurchaseButton'>
            Comprar
          </button>
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
  )
}

export default Details