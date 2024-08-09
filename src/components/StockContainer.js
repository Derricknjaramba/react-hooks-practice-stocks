import React, { useState, useEffect } from "react";
import Stock from "./Stock";

function StockContainer({ onBuyStock }) {
  const [stocks, setStocks] = useState([]);
  const [sort, setSort] = useState("Alphabetically");
  const [filter, setFilter] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sort === "Alphabetically") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sort === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter(stock => stock.type === filter);

  return (
    <div>
      <h2>Stocks</h2>
      <div>
        <strong>Sort by:</strong>
        <label>
          <input
            type="radio"
            value="Alphabetically"
            name="sort"
            checked={sort === "Alphabetically"}
            onChange={handleSortChange}
          />
          Alphabetically
        </label>
        <label>
          <input
            type="radio"
            value="Price"
            name="sort"
            checked={sort === "Price"}
            onChange={handleSortChange}
          />
          Price
        </label>
        <br />
        <label>
          <strong>Filter:</strong>
          <select onChange={handleFilterChange} value={filter}>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
      </div>
      <div>
        {filteredStocks.map(stock => (
          <Stock
            key={stock.id}
            stock={stock}
            onBuyStock={onBuyStock}
          />
        ))}
      </div>
    </div>
  );
}

export default StockContainer;

