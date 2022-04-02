import React from 'react';
import { Link } from 'react-router-dom';

export default function CardItem(props) {
  return (
    <>
      <div className={props.position}>
        <Link to={props.path}>
          <figure className='cardsItemPicWrap' data-category={props.label}>
            <img
              className='cardsItemImg'
              alt={props.label}
              src={props.src}
            />
          </figure>
          <div className='cardsItemInfo'>
            <p className='cardsItemText'>{props.text}</p>
          </div>
        </Link>
      </div>
    </>
  );
}