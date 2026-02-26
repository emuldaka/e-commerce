import React from "react";

function CartModal({ cartItems, onRemove, onClose }) {
  const totalCost = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.newPrice) * item.quantity,
    0,
  );

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="cart-modal">
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <div className="empty-cart">Your cart is empty</div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-quantity">
                    ${item.newPrice} × {item.quantity}
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-total">Total: ${totalCost.toFixed(2)}</div>
          </>
        )}
      </div>
    </>
  );
}

export default CartModal;
