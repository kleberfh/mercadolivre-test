import React from 'react';
import {get} from "lodash";
import { MdOutlineLocalShipping } from 'react-icons/md';
import {convertIntToMoney} from "../utilities/utilities";

import '../styles/ItemCard.css';

const ItemCard = ({ item }) => {

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
    <div className='ItemCard' onClick={() => console.log('Open item', item.id)}>
      <img
        className='ItemPicture'
        src={get(item, 'picture', '')}
      />
      <div className="ItemDetails">
        <span className="ItemPrice">
          {convertIntToMoney(fixPriceCents(), get(item, 'price.currency', 'BRL'))}
          {item.free_shipping && (
            <div className='ItemFreeShipping'>
              <MdOutlineLocalShipping size={10} color='#1d1d1d' />
            </div>
          )}
        </span>
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