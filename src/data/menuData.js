// menuData.js
// Plain JavaScript module — zero React, zero JSX, zero imports.
// Its only job is to export the MENU constant so any component
// that needs it can import it without prop-drilling it down the tree.

const MENU = [
  // Each fruit is an object with 4 properties:
  // id    → unique integer. Used as the React "key" prop when we map
  //         over this array, and used in cart logic to identify which
  //         fruit was clicked without comparing names (strings can have
  //         typos; numbers are exact).
  // name  → the display label rendered under the image.
  // price → a JS number, not a string. Stored as a number so we can
  //         multiply price * qty directly without parsing.
  // image → a URL path string. Because the images live in public/assets/,
  //         Vite serves them as static files. The browser resolves
  //         "/assets/mango.jpg" from the site root — no import needed.
  { id: 1, name: "Carambola", price: 2.0, image: "/assets/carambola.jpg" },
  { id: 2, name: "Coconut", price: 3.5, image: "/assets/coconut.jpg" },
  { id: 3, name: "Durian", price: 5.0, image: "/assets/durian.jpg" },
  { id: 4, name: "Guava", price: 1.5, image: "/assets/guava.jpg" },
  { id: 5, name: "Lychee", price: 2.5, image: "/assets/lychee.jpg" },
  { id: 6, name: "Jabuticaba", price: 3.0, image: "/assets/jabuticaba.jpg" },
  { id: 7, name: "Mango", price: 2.0, image: "/assets/mango.jpg" },
  { id: 8, name: "Papaya", price: 1.75, image: "/assets/papaya.jpg" },
  {
    id: 9,
    name: "Passionfruit",
    price: 2.25,
    image: "/assets/passionfruit.jpg",
  },
];

// Named export (not default). This means the import line elsewhere
// must use curly braces: import { MENU } from "../data/menuData"
// Named exports are more explicit — you can see exactly what you're
// pulling in at the import site, which matters as projects grow.
export { MENU };
