import React from 'react';
import {get} from "lodash";
import '../styles/ItemCard.css';
import {convertIntToMoney} from "../utilities/utilities";

const ItemCard = ({ item }) => {
  console.log(item);

  const price = get(item, 'price', '');
  const amount = get(item, 'price.amount', '');
  const decimals = get(item, 'price.decimals', 0);

  const fixPriceCents = () => {
    let fixedAmount = amount;
    if (decimals === 0) {
      fixedAmount = Number(amount + '00')
    }
    return fixedAmount.toString().replace('.', '');
  }

  return (
    <div className='ItemCard'>
      <img
        className='ItemPicture'
        src={get(item, 'picture', '')}
      />
      <div className="ItemDetails">
        <p className="ItemPrice">
          {convertIntToMoney(fixPriceCents(), get(item, 'price.currency', 'BRL'))}
        </p>
        <p className="ItemTitle">
          {get(item, 'title', '')}
        </p>
      </div>
      <p className="ItemState">
        {get(item, 'seller_state', '')}
      </p>
    </div>
  )
};

export default ItemCard;