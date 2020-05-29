import React from "react";

export default () => (
  <div>
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="bullet"></button>
      <button className="ql-list" value="ordered"></button>
    </span>
  </div>
);
