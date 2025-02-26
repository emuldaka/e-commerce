import React, { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Siderbar/Sidebar";

//Datebase
import products from "./db/data";
import Card from "./components/Card";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  //Input Filter
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product) =>
    product.title.toLocaleUpperCase().indexOf(query.toLocaleUpperCase() !== -1)
  );

  //Radio Filter
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //Buttons Filter
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    //Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    //Selected Filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, prevPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice == selected ||
          prevPrice == selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, newPrice, prevPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          newPrice={newPrice}
          prevPrice={prevPrice}
        />
      )
    );
  }

  filteredData(products, selectedCategory);

  return (
    <>
      <Sidebar />
      <Navigation />
      <Recommended />
      <Products />
    </>
  );
}
export default App;
