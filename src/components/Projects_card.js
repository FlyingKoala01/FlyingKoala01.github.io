import React from 'react';
import { Link } from 'react-router-dom';

export default function CardItem(props) {
  return (
    <>
    <Link to={props.path} className="cardLinks">
      <div className={props.position}>
          <img
            className='cardsItemImg'
            alt={props.label}
            src={props.src}
          />
          <div className='cardsItemInfo'>
            <p className='cardsItemText'>{props.text}</p>
          </div>
      </div>
    </Link>
    </>
  );
}