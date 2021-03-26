import React from "react";

import { CharacterCard } from "components";

import "./CharacterList.scss";

const CharacterList = ({
  characters = [],
  onBookmarkClick,
  handleMoveLeft,
  handleMoveRight
}) => {
  return (
    <section className="cards">
      {characters.map(character => (
        <CharacterCard
          key={character?.id}
          character={character}
          isBookmarked={character.isBookmarked}
          onBookmarkClick={onBookmarkClick}
          handleMoveRight={handleMoveRight}
          handleMoveLeft={handleMoveLeft}
        />
      ))}
    </section>
  );
};

export default CharacterList;
