// Declare CSS/SCSS modules so side-effect imports like "react-datepicker/dist/react-datepicker.css" work.
declare module "*.css";
declare module "*.scss";

// Specifically allow the react-datepicker CSS side-effect import (optional but explicit).
declare module "react-datepicker/dist/react-datepicker.css";
