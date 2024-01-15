import React from "react";
import css from "../Card/Card.module.css";
import image from '../../assets/cardImage.svg';
import useData from "../custom hooks/useFetchdata";

const QuoteCard = () => {
  const {quote, id} = useData();
  return (
    <>
      <div className={css.Card}>
        <h1>Quote #{id}</h1>
        <span>"{quote}"</span>
        <img src={image} alt="Card Image" />
      </div>
    </>
  );
};

export default QuoteCard;
