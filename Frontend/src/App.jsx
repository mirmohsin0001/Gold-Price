import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-76jbu8sm63n0xy1-io"); // Replace with your API key
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch("https://www.goldapi.io/api/XAU/INR", requestOptions);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setGoldPrice(data); // Assuming the gold price is in the response data
      } catch (err) {
        setError(err.message);
        console.error("Error fetching gold price:", err);
      }
    };

    fetchGoldPrice();
  }, []);

  return (

    <div className="App">
      <h1>Gold Price</h1>
      {error ? (
        <p>Error fetching gold price: {error}</p>
      ) : goldPrice ? (
        <div>
          <p>24 carat/gm: {goldPrice.price_gram_24k}</p>
          <p>Timestamp: {goldPrice.timestamp}</p>
          <p>Open: {goldPrice.open_price}</p>
          <p>High: {goldPrice.high_price}</p>
          <p>Low: {goldPrice.low_price}</p>
          <p>Close: {goldPrice.prev_close_price}</p>
          <p>Price: {goldPrice.price}</p>
          <p>Symbol: {goldPrice.symbol}</p>
        </div>
      ) : (
        <p>Loading gold price...</p>
      )}
    </div>
  );
};

export default App;