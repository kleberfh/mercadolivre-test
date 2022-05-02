import React from 'react';
import {get} from "lodash";
import {useNavigate} from "react-router-dom";
import { MdOutlineLocalShipping } from 'react-icons/md';
import {convertIntToMoney, getProductImage} from "../utilities/utilities";
import '../styles/itemCard.css';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const amount = get(item, 'price.amount', '');
  const decimals = get(item, 'price.decimals', 0);

  const fixPriceCents = () => {
    let fixedAmount = amount;
    if (decimals === 0) {
      fixedAmount = Number(amount + '00')
    }
    return fixedAmount.toString().replace('.', '');
  };

  const handleItemSelect = () => {
    navigate(`/items/${item.id}`);
  }

  return (
    <div className='ItemCard' onClick={handleItemSelect}>
      <img
        alt={item.title}
        className='ItemPicture'
        src={getProductImage(get(item, 'thumbnail_id', null), get(item, 'picture', ''))}
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