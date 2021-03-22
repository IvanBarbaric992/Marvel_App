import React from "react";
import BookmarkIcon from "./BookmarkIcon";

import "./CharacterCard.scss";

const CharacterCard = ({
  character = {},
  imageSize = "standard_fantastic",
  isBookmarked = false,
  onBookmarkClick = () => {}
}) => {
  const imageUrl = `${character?.thumbnail?.path}/${imageSize}.${character?.thumbnail?.extension}`;
  return (
    <div className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <h4 className="card__title">{character?.name}</h4>
      <button
        title={isBookmarked ? "Remove from bookmark" : "Add to bookmark"}
        className="card__bookmark--button"
        onClick={() => onBookmarkClick(character)}
      >
        <BookmarkIcon isBookmarked={isBookmarked} />
      </button>
    </div>
  );
};

export default CharacterCard;
