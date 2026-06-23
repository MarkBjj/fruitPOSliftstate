// OrderSummary.jsx
// This component's job is to display whatever is currently in the cart.
// It does NOT own state. It does NOT know about the MENU array.
// It receives two things from App.jsx via props:
//   - cartItems: the current array of cart objects { id, name, price, image, qty }
//   - onRemoveItem: the handler to call when a remove button is clicked

import "./OrderSummary.css";

const OrderSummary = ({ cartItems, onRemoveItem, onCheckout, orderPlaced }) => {
  // --- DERIVED VALUE: Total price ---
  // We do NOT store the total in useState. It is not independent data —
  // it is always calculated FROM cartItems. Any time cartItems changes,
  // React re-renders this component with the new prop, and total is
  // simply recalculated from scratch on every render. This is intentional.
  // Storing derived values in state is a common beginner mistake that leads
  // to state getting out of sync with itself.
  const total = cartItems.reduce((accumulator, item) => {
    // .reduce() walks through every item in cartItems and accumulates
    // a single result — in this case, a running sum of all line totals.
    // accumulator → the running total so far (starts at 0, see second argument)
    // item        → the current cart object being processed
    return accumulator + item.price * item.qty;
    // Each iteration adds this item's line total (price × qty) to the
    // running sum. After the last item, reduce() returns the final total.
  }, 0);
  // The ", 0" is the initial value of accumulator.
  // Without it, reduce() uses the first array element as the starting
  // value, which would cause incorrect results here since the first
  // element is an object, not a number.

  // --- RENDER ---
  return (
    <div className="order-container">
      <h2 className="order-title">Current Order</h2>
      {/* Conditional rendering: show a message when the cart is empty,
          show the list when it has items.
          The && operator works like: if (left side is truthy) → render right side.
          cartItems.length === 0 is true when the array is empty, so we render
          the empty message. When items exist, the second condition renders the list. */}
      {orderPlaced && <p className="order-placed-message">✓ Order placed!</p>}
      {cartItems.length === 0 && (
        <p className="order-empty">No items yet. Tap a fruit to add it.</p>
      )}
      {/* // So && became the React convention for "show this only when condition is
      true." */}
      {cartItems.length > 0 && (
        <ul className="order-list">
          {/* Again we use .map() to transform the cartItems array into JSX rows.
              Each cart item becomes one <li> row in the order list. */}
          {cartItems.map((item) => (
            <li key={item.id} className="order-item">
              {/* key={item.id} serves the same purpose as in Menu.jsx —
                  React uses it to track which row is which when the list
                  updates (item added, removed, or qty changed). */}

              <img
                src={item.image}
                alt={item.name}
                className="order-item-image"
              />

              <span className="order-item-name">{item.name}</span>

              <span className="order-item-qty">x{item.qty}</span>
              {/* Shows the quantity, e.g. "x2". This value comes directly
                  from the cart object in state — when qty changes in App.jsx,
                  React re-renders this component and the new qty appears here
                  automatically. We never manually update the DOM. */}

              <span className="order-item-price">
                ${(item.price * item.qty).toFixed(2)}
                {/* Line total: price × qty, formatted to 2 decimal places.
                    Wrapped in () before .toFixed() to ensure the multiplication
                    happens first, then the result is formatted as a string. */}
              </span>

              <button
                className="order-item-remove"
                onClick={() => onRemoveItem(item.id)}
                // We pass only item.id to onRemoveItem — that is all App.jsx
                // needs to find and decrement/remove the correct cart entry.
                // Same arrow function wrapper pattern as in Menu.jsx:
                // () => onRemoveItem(item.id) defers the call until click time.
              >
                −
                {/* The minus sign here is the HTML entity for a proper
                    minus/dash character, cleaner than a plain hyphen. */}
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Order total — only shown when there is something in the cart */}
      {cartItems.length > 0 && (
        <div className="order-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
          {/* total was calculated by reduce() above — we just display it here.
              .toFixed(2) formats it to 2 decimal places as a display string. */}
        </div>
      )}
      {/* // CHECKOUT BUTTON */}
      {cartItems.length > 0 && (
        <button className="checkout-button" onClick={() => onCheckout()}>
          Checkout ➜
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
