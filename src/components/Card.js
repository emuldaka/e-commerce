import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

function Card({
  id,
  img,
  title,
  star,
  reviews,
  newPrice,
  prevPrice,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) {
  const product = { id, img, title, star, reviews, newPrice, prevPrice };

  return (
    <section className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <section className="card-reviews">
          {star}
          {star}
          {star}
          {star}
          <span className="total-reviews">{reviews}</span>
        </section>
        <section className="card-price">
          <div className="price">
            <del>{prevPrice}</del> ${newPrice}
          </div>

          <div className="card-actions">
            <button
              className="wishlist-btn"
              onClick={() => onAddToWishlist(product)}
              title="Add to Wishlist"
            >
              <FiHeart
                className="bag-icon"
                style={{ fill: isInWishlist ? "red" : "none" }}
              />
            </button>
            <button
              className="cart-btn"
              onClick={() => onAddToCart(product)}
              title="Add to Cart"
            >
              <BsFillBagHeartFill className="bag-icon" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Card;
