import React from "react";
import "./Wishlist.css";

function Wishlist({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Wishlist</h2>

      <div>
        <label className="sidebar-label-container">
          <input
            onChange={handleChange}
            type="radio"
            value="wishlist"
            name="wishlist"
          />
          <span className="checkmark"></span>Show Wishlisted Items
        </label>
      </div>
    </div>
  );
}

export default Wishlist;
