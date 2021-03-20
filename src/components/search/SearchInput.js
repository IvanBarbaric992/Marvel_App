import React from "react";

import "./Search.scss";

const SearchInput = ({ onChange = () => {} }) => {
  return (
    <input
      name="search"
      type="text"
      placeholder="Search characters"
      onChange={onChange}
    />
  );
};

export default SearchInput;
