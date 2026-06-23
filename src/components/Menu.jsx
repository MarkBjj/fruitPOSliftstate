// Menu.jsx
// This component's only job is to display the fruit grid and detect clicks.
// It knows nothing about the cart. It does not own any state.
// It receives two things from App.jsx via props:
//   - the MENU array (the list of fruits to display)
//   - onAddItem (the handler to call when a fruit card is clicked)

// Static menu data — list of available fruits, never changes
import { MENU } from "../data/menuData";
// We import MENU directly into Menu.jsx rather than receiving it as a prop.
// This is fine because MENU is static data that never changes — it is not
// state, and no other component needs to control which fruits are displayed.
// If the menu ever became dynamic (fetched from an API), we would lift this
// up to App.jsx and pass it down as a prop instead.

import "./Menu.css";

// Menu receives "onAddItem" from App.jsx via props.
// Props are always an object — we destructure it immediately in the
// function signature to pull out just what we need: { onAddItem }
const Menu = ({ onAddItem }) => {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Select Fruits</h2>

      <div className="menu-grid">
        {/* We use .map() to transform the MENU array into an array of JSX elements.
            .map() loops over every fruit object and returns a JSX card for each one.
            React then renders that array of cards into the DOM. */}
        {MENU.map((fruit) => (
          <div
            key={fruit.id}
            // "key" is a special React prop — NOT accessible inside the component.
            // React uses it internally to track which card is which when the list
            // re-renders. Without a key, React re-renders the entire list on every
            // change. With a stable key (the id), it only updates what changed.
            // Always use a unique stable value like an id — never use the .map()
            // index as a key, because indexes shift when items are added/removed.

            className="fruit-card"
            onClick={() => onAddItem(fruit)}
            // When the card is clicked, we call onAddItem function > in App.jsx and pass the full fruit object: { id, name, price, image }.
            // App.jsx receives this object in handleAddItem(fruit) and uses it
            // to update the cart state.
            //
            // Notice we wrap it in an arrow function: () => onAddItem(fruit)
            // This is necessary because onClick expects a FUNCTION REFERENCE,
            // not a function call. If we wrote onClick={onAddItem(fruit)},
            // React would call onAddItem immediately when rendering the card,
            // not when the user clicks it — which would trigger an infinite
            // render loop. The arrow function defers the call until click time.
          >
            <img
              src={fruit.image}
              // fruit.image is the path string "/assets/mango.jpg".
              // The browser resolves this from the site root, which Vite
              // maps to the public/ folder. No import needed.

              alt={fruit.name}
              // alt text is important for accessibility — screen readers
              // read this aloud for visually impaired users. Always set it
              // to something descriptive, never leave it empty on meaningful images.

              className="fruit-image"
            />

            <p className="fruit-name">{fruit.name}</p>
            {/* {fruit.name} is a JSX expression — the curly braces tell React
                to evaluate this as JavaScript and render the result as text. */}

            <p className="fruit-price">
              ${fruit.price.toFixed(2)}
              {/* .toFixed(2) formats the number to always show 2 decimal places.
                  Without it, 2.00 would render as "2" and 1.50 as "1.5".
                  toFixed() returns a STRING, which is fine here since we only
                  need to display it, not do math on it. */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
