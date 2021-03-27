import React from "react";

import { CharacterCard } from "components";

import "./CharacterList.scss";

const CharacterList = ({
  characters = [],
  onBookmarkClick,
  handleSwapCharacters
}) => {
  return (
    <section className="cards">
      {characters.map(character => (
        <CharacterCard
          key={character?.id}
          character={character}
          isBookmarked={character.isBookmarked}
          onBookmarkClick={onBookmarkClick}
          handleSwapCharacters={handleSwapCharacters}
        />
      ))}
    </section>
  );
};

export default CharacterList;
