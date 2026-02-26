import React from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";

function Nav({
  handleInputChange,
  cartCount = 0,
  wishlistCount = 0,
  isCartOpen = false,
  setIsCartOpen = () => {},
}) {
  const handleCartClick = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    alert(`Wishlist has ${wishlistCount} item(s)`);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    alert("Profile functionality coming soon!");
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter your search"
            onChange={handleInputChange}
          />
        </div>

        <div className="profile-container">
          <button
            className="nav-button"
            onClick={handleWishlistClick}
            title="Wishlist"
          >
            <FiHeart className="nav-icons" />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </button>
          <button
            className="nav-button"
            onClick={handleCartClick}
            title="Shopping Cart"
          >
            <AiOutlineShoppingCart className="nav-icons" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button
            className="nav-button"
            onClick={handleProfileClick}
            title="Profile"
          >
            <AiOutlineUserAdd className="nav-icons" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
