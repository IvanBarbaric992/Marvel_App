import React, { useCallback, useEffect, useRef, useState } from "react";

import { CharacterList, Loader, Pagination, SearchBox } from "components";

import useDebounce from "hooks/useDebounce";

import fetchMarvelCharactersFromApi from "services/api/fetchMarvelCharacters";
import {
  getItemFromStorage,
  setItemToStorage
} from "services/utilities/storage";

const MarvelCharacters = () => {
  const [data, setData] = useState({ characters: [], totalRecords: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");
  const [bookmarkedCharacters, setBookmarkedCharacters] = useState(() => {
    return getItemFromStorage({ key: "@bookmark" }) || [];
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

      setIsLoading(false);
    }
  }, [pageData, searchField]);

  useEffect(() => {
    if (!searchField) {
      dataFromApi.current.characters = bookmarkedCharacters;
      dataFromApi.current.totalRecords = bookmarkedCharacters.length;
    }
    if (!isLoading) {
      setData({
        characters: dataFromApi.current.characters?.map(character => ({
          ...character,
          isBookmarked: !!bookmarkedCharacters.find(c => c.id === character.id)
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
    const { value } = e.target;
    setSearchField(e.target.value);
    if (!!value) {
      setIsLoading(true);
    }
  };
  const onPageChange = pageData => {
    setPageData({ ...pageData });
    setIsLoading(true);
  };

  const onBookmarkClick = character => {
    if (bookmarkedCharacters.find(c => c.id === character.id)) {
      setBookmarkedCharacters(prevState =>
        prevState.filter(x => x.id !== character.id)
      );
    } else {
      setBookmarkedCharacters(prevState => [...prevState, character]);
    }
    isBookmarkToggled.current = true;
  };
  const handleSwapCharacters = (e, characterId) => {
    const { id } = e.target;
    let characterIndex = data.characters.findIndex(c => c.id === characterId);
    let characterIndexToSwap = 0;
    if (id === "swap-left") {
      characterIndexToSwap =
        characterIndex - 1 === -1
          ? data.characters.length - 1
          : characterIndex - 1;
    } else {
      characterIndexToSwap =
        characterIndex + 1 > data.characters.length - 1
          ? 0
          : characterIndex + 1;
    }

    let characters = [...data.characters];
    characters[characterIndexToSwap] = characters.splice(
      characterIndex,
      1,
      characters[characterIndexToSwap]
    )[0];

    setData(prevState => {
      return {
        ...prevState,
        characters: [...characters]
      };
    });
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
            handleSwapCharacters={handleSwapCharacters}
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
