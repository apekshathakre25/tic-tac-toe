import React, { useEffect, useState } from "react";

const useData = () => {
  const [quote, setQuote] = useState();
  const [id, setId] = useState();

  const fetchData = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setQuote(data.slip.advice);
    setId(data.slip.id);
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData,5000);
  },[]);

  return {quote,id};
};

export default useData;
