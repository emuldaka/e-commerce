import React, { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Siderbar/Sidebar";
import CartModal from "./components/CartModal";
import "./index.css";

//Datebase
import products from "./db/data";
import Card from "./components/Card";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistFilterActive, setIsWishlistFilterActive] = useState(false);
  const [previousCategory, setPreviousCategory] = useState(null);

  //Input Filter
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) =>
      product.title.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) !==
      -1,
  );

  //Radio Filter
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsWishlistFilterActive(false);
  };

  //Toggle Wishlist Filter
  const handleWishlistFilterToggle = () => {
    if (!isWishlistFilterActive) {
      //Turning on wishlist filter - save current category
      setPreviousCategory(selectedCategory);
      setSelectedCategory("wishlist");
      setIsWishlistFilterActive(true);
    } else {
      //Turning off wishlist filter - restore previous category
      setSelectedCategory(previousCategory);
      setIsWishlistFilterActive(false);
    }
  };

  //Buttons Filter
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //Add to Cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  //Add to Wishlist
  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.find((item) => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  //Remove from Cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    //Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    //Selected Filter (including wishlist)
    if (selected) {
      if (selected === "wishlist") {
        filteredProducts = filteredProducts.filter((product) =>
          wishlist.some(
            (item) => item.id === product.title + products.indexOf(product),
          ),
        );
      } else {
        filteredProducts = filteredProducts.filter(
          ({ category, color, company, newPrice, prevPrice, title }) =>
            category === selected ||
            color === selected ||
            company === selected ||
            newPrice === selected ||
            prevPrice === selected ||
            title === selected,
        );
      }
    }

    return filteredProducts.map((product, index) => (
      <Card
        key={product.title + index}
        id={product.title + index}
        img={product.img}
        title={product.title}
        star={product.star}
        reviews={product.reviews}
        newPrice={product.newPrice}
        prevPrice={product.prevPrice}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={wishlist.some(
          (item) => item.id === product.title + index,
        )}
      />
    ));
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation
        query={query}
        handleInputChange={handleInputChange}
        cartCount={cartItems.length}
        wishlistCount={wishlist.length}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        onRemoveFromCart={handleRemoveFromCart}
        onWishlistFilterToggle={handleWishlistFilterToggle}
        isWishlistFilterActive={isWishlistFilterActive}
      />
      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </>
  );
}
export default App;
