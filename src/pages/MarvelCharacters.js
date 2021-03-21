import React, { useEffect, useRef, useState } from "react";

import { CharacterList, Pagination, SearchBox } from "components";

import fetchMarvelCharactersFromApi from "services/api/fetchMarvelCharacters";
import {
  getItemFromStorage,
  setItemToStorage
} from "services/utilities/storage";

import { removeKey } from "services/utilities/removeKeyFromObject";

const MarvelCharacters = () => {
  const [data, setData] = useState({ characters: [], totalRecords: 0 });
  const [searchField, setSearchField] = useState("");
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState(() => {
    return (
      getItemFromStorage({ key: process.env.REACT_APP_LOCAL_STORAGE_KEY }) || {}
    );
  });
  const dataFromApi = useRef({ characters: [], totalRecords: 0 });
  const [pageData, setPageData] = useState({
    limit: 20,
    offset: 0
  });
  const isBookmarkToggled = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!!searchField && !isBookmarkToggled.current) {
        console.log("fetch");
        const { characters, recordsCount } = await fetchMarvelCharactersFromApi(
          {
            limit: pageData.limit,
            offset: pageData.offset,
            searchField
          }
        );
        dataFromApi.current.characters = characters;
        dataFromApi.current.totalRecords = recordsCount;
      } else if (!searchField) {
        dataFromApi.current.characters = Object.keys(bookmarkedCharacters).map(
          bookmarkId => bookmarkedCharacters[bookmarkId]
        );
        dataFromApi.current.totalRecords = Object.keys(
          bookmarkedCharacters
        ).length;
      }
      setData({
        characters: dataFromApi.current.characters.map(character => ({
          ...character,
          isBookmarked: !!bookmarkedCharacters[character.id]
        })),
        totalRecords: dataFromApi.current.totalRecords
      });
    };

    fetchData();

    if (isBookmarkToggled.current) {
      setItemToStorage({
        key: process.env.REACT_APP_LOCAL_STORAGE_KEY,
        value: bookmarkedCharacters
      });
      isBookmarkToggled.current = false;
    }
  }, [pageData, searchField, bookmarkedCharacters]);
  const handleSearchBoxChange = e => {
    e.preventDefault();
    setSearchField(e.target.value);
  };
  const onPageChange = pageData => {
    setPageData(prevState => ({ ...prevState, ...pageData }));
  };

  const onBookmarkClick = character => {
    if (bookmarkedCharacters[character.id]) {
      setBookmarkedCharacters(prevState => ({
        ...removeKey(character.id, prevState)
      }));
    } else {
      setBookmarkedCharacters(prevState => ({
        ...prevState,
        [character.id]: character
      }));
    }
    isBookmarkToggled.current = true;
  };

  return (
    <>
      <SearchBox onChange={handleSearchBoxChange} />
      <CharacterList
        characters={data.characters}
        onBookmarkClick={onBookmarkClick}
      />
      {data.totalRecords > 20 ? (
        <Pagination
          numberOfRecords={data.totalRecords}
          pageSize={20}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  );
};

export default MarvelCharacters;
