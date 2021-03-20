import React from "react";

import SearchInput from "./SearchInput";

const SearchBox = ({ onChange }) => {
  return (
    <form className="search" autoComplete="off">
      <SearchInput onChange={onChange} />
    </form>
  );
};

export default SearchBox;
