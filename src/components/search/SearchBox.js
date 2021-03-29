import React from "react";

import "./SearchBox.scss";

const SearchBox = ({ onChange }) => {
  return (
    <form className="search" autoComplete="off">
      <input
        name="search"
        type="text"
        aria-label="search input"
        className="search__input"
        placeholder="Search characters"
        onChange={onChange}
        onKeyDown={e => e.key === "Enter" && e.preventDefault()}
      />
    </form>
  );
};

export default SearchBox;
