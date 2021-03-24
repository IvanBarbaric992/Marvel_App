import React, { useCallback, useEffect, useRef, useState } from "react";

import { CharacterList, Loader, Pagination, SearchBox } from "components";

import useDebounce from "hooks/useDebounce";
import fetchMarvelCharactersFromApi from "services/api/fetchMarvelCharacters";

import {
  getItemFromStorage,
  setItemToStorage
} from "services/utilities/storage";
import { removeKey } from "services/utilities/removeKeyFromObject";

const MarvelCharacters = () => {
  const [data, setData] = useState({ characters: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState(() => {
    return getItemFromStorage({ key: "@bookmark" }) || {};
  });
  const dataFromApi = useRef({ characters: [], totalRecords: 0 });
  const [pageData, setPageData] = useState({
    limit: 20,
    offset: 0
  });
  const isBookmarkToggled = useRef(false);

  const fetchData = useCallback(async () => {
    if (!!searchField) {
      const {
        characters,
        recordsCount,
        error
      } = await fetchMarvelCharactersFromApi({
        limit: pageData.limit,
        offset: pageData.offset,
        searchField
      });

      if (error) {
        setError(error);
        return;
      }

      dataFromApi.current.characters = characters;
      dataFromApi.current.totalRecords = recordsCount;
    }
    setIsLoading(false);
  }, [pageData, searchField]);

  useEffect(() => {
    if (!searchField) {
      dataFromApi.current.characters = Object.keys(bookmarkedCharacters).map(
        bookmarkId => bookmarkedCharacters[bookmarkId]
      );
      dataFromApi.current.totalRecords = Object.keys(
        bookmarkedCharacters
      ).length;
    }
    if (!isLoading) {
      setData({
        characters: dataFromApi.current.characters?.map(character => ({
          ...character,
          isBookmarked: !!bookmarkedCharacters[character.id]
        })),
        totalRecords: dataFromApi.current.totalRecords
      });
    }

    if (isBookmarkToggled.current) {
      setItemToStorage({
        key: "@bookmark",
        value: bookmarkedCharacters
      });
      isBookmarkToggled.current = false;
    }
  }, [searchField, bookmarkedCharacters, isLoading]);

  useDebounce({ callback: fetchData, value: searchField, debounceDelay: 1000 });

  const handleSearchBoxChange = e => {
    e.preventDefault();
    setSearchField(e.target.value);
    setIsLoading(true);
  };
  const onPageChange = pageData => {
    setPageData(prevState => ({ ...prevState, ...pageData }));
    setIsLoading(true);
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

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <SearchBox onChange={handleSearchBoxChange} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CharacterList
            characters={data.characters}
            onBookmarkClick={onBookmarkClick}
          />
        </>
      )}
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
