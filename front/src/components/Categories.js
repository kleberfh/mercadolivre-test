import React from "react";
import { BsChevronRight } from 'react-icons/bs';
import '../styles/categories.css';

const Categories = ({ categories }) => {
  return (
    <div className='Categories'>
      {
        categories.map((category, index) =>
          (<span className='Category' key={index.toString()}>
            {index >= 1 && (
              <BsChevronRight
                size='14px'
                className='CategoryIcon'
              />
            )}
            {category}
          </span>)
        )
      }
    </div>
  );
};

export default Categories;