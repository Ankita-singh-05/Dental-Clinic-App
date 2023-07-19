import React from "react";
import "../../src/index.css";

const Spinner = () => {
  return (
    <div class="spinner">
    <button class="btn btn-primary " type="button" disabled>
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      ></span>
      "Keep smiling, it won't be long!"
    </button>
    </div>
  );
};

export default Spinner;
