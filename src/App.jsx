// App.jsx
// This is the ROOT component — the top of the component tree.
// Its two critical jobs:
//   1. OWN the cartItems state (the single source of truth for the cart)
//   2. DEFINE the handler functions that modify that state
//
// Neither Menu.jsx nor OrderSummary.jsx will own or modify state directly.
// They only receive data and callbacks via props. That is the entire point
// of "lifting state" — the state lives in the closest common ancestor of
// all components that need to read or change it.

import { useState } from "react";
// useState is the React hook that lets a component own reactive data.
// When state changes, React automatically re-renders the component

import Menu from "./components/Menu";
import OrderSummary from "./components/OrderSummary";
// We import both child components so App can render them in its JSX.

import "./App.css";
// App-level styles: the two-column layout lives here.

const App = () => {
  // --- STATE ---
  // cartItems is an array of objects. It starts empty (no items in cart).
  // Each object will look like: { id, name, price, image, qty }
  // "cartItems" is the current value. "setCartItems" is the ONLY way
  // to update it — we never mutate cartItems directly (e.g. no .push()).
  // Mutating state directly would not trigger a re-render.
  // DECLARING CART ARRAYThat [] at the end — inside useState() — is the initial value. You're telling React: "when this component first loads, cartItems starts as an empty array."
  const [cartItems, setCartItems] = useState([]);

  // --- HANDLER: Add item ---
  // This function is passed DOWN to Menu.jsx as a prop.
  // Menu.jsx will call it when the user clicks a fruit card.
  // It receives the full fruit object from the MENU array: { id, name, price, image }
  const handleAddItem = (fruit) => {
    // We use the functional updater form of setCartItems: (prevItems) => ...
    // React guarantees that "prevItems" is always the latest state value.
    setCartItems((prevItems) => {
      // Check if this fruit is already in the cart by looking for
      // an object whose id matches the clicked fruit's id.
      // .find() returns the matching object, or undefined if not found.
      const existingItem = prevItems.find((item) => item.id === fruit.id);

      if (existingItem) {
        // Fruit IS already in the cart → increment its qty by 1.
        // We use .map() to produce a BRAND NEW array (never mutate state).
        // For every item in the current cart:
        //   - if it's the one we want → return a new object with qty + 1
        //   - otherwise → return it unchanged
        // The spread { ...item } copies all existing properties, then
        // qty: item.qty + 1 overwrites just the qty property.
        return prevItems.map((item) =>
          item.id === fruit.id ? { ...item, qty: item.qty + 1 } : item,
        );
      } else {
        // Fruit is NOT in the cart yet → add it as a new entry with qty 1.
        // Again we produce a new array using spread [...prevItems, newItem]
        // rather than mutating the existing array with .push().
        return [...prevItems, { ...fruit, qty: 1 }];
        // { ...fruit } spreads the fruit's id, name, price, image properties,
        // then qty: 1 adds the qty property that only exists in cart objects,
        // not in the original MENU data.
      }
    });
  };

  // --- HANDLER: Remove item ---
  // Passed DOWN to OrderSummary.jsx as a prop.
  // Called when the user clicks the remove button on a cart row.
  // Receives the id of the fruit to decrement/remove.
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => {
      // First find the item so we can check its current qty.
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem.qty === 1) {
        // qty is 1 → removing one more means zero → drop it from the array.
        // .filter() returns a new array containing only items that do NOT
        // match the id. The clicked item is excluded entirely.
        return prevItems.filter((item) => item.id !== id);
      } else {
        // qty is more than 1 → just decrement, keep the row in the cart.
        return prevItems.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        );
      }
    });
  };

  // CHECKOUT uplifted from OrderSummary.jsx
  const handleCheckout = () => {
    // Convert the cart array to a JSON string for display
    const json = JSON.stringify(cartItems, null, 2);
    // Clear the cart
    setCartItems([]);
    // Show the order as a JSON popup
    alert(json);
  };

  // --- RENDER ---
  return (
    <div className="app-container">
      {/* The two-column layout. Both columns live side by side via CSS. */}

      <Menu
        onAddItem={handleAddItem}
        // We pass the handler as a prop named "onAddItem".
        // The "on" prefix is a React convention for callback props —
        // it signals "call this when something happens".
        // Menu.jsx does not know what this function does internally.
        // It just calls it with the fruit object when a card is clicked.
      />

      <OrderSummary
        cartItems={cartItems}
        // We pass the state value down so OrderSummary can render the list.
        // OrderSummary cannot modify cartItems — it can only read it.
        onRemoveItem={handleRemoveItem}
        // We pass the remove handler so OrderSummary can trigger it
        // when the user clicks a remove button on a cart row.
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;
