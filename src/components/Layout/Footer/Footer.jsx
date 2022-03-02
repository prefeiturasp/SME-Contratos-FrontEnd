import React from "react";

export default props => (
  <footer className="sticky-footer bg-white">
    <div className="container my-auto">
      <div clasclassNames="copyright text-center my-auto">
        <span>{props.children}</span>
      </div>
    </div>
  </footer>
);
