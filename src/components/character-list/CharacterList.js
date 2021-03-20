import React from "react";

import CharacterCard from "components/character-card";

import "./CharacterList.scss";

const CharacterList = ({ characters = [], onBookmarkClick = () => {} }) => {
  return (
    <section className="cards">
      {characters.map(character => (
        <CharacterCard
          key={character?.id}
          character={character}
          isBookmarked={character.isBookmarked}
          onBookmarkClick={onBookmarkClick}
        />
      ))}
    </section>
  );
};

export default CharacterList;
