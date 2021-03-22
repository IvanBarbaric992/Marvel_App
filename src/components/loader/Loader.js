import React from "react";

import "./Loader.scss";

const Loader = () => {
  return (
    <div className="load-spinner-wrapper">
      <div className="load-spinner"></div>
      <div className="load-spinner-text">Loading characters...</div>
    </div>
  );
};

export default Loader;
