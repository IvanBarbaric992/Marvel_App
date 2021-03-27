import React from "react";
import BookmarkIcon from "./BookmarkIcon";

import "./CharacterCard.scss";

const CharacterCard = ({
  character = {},
  imageSize = "standard_fantastic",
  isBookmarked = false,
  onBookmarkClick = () => {},
  handleSwapCharacters = () => {}
}) => {
  const imageUrl = `${character?.thumbnail?.path}/${imageSize}.${character?.thumbnail?.extension}`;
  return (
    <div
      className="card"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6))," +
          `url(${imageUrl}) no-repeat`,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h4 className="card__title">{character?.name}</h4>
      <button
        title={isBookmarked ? "Remove from bookmark" : "Add to bookmark"}
        className="card__bookmark--button"
        onClick={() => onBookmarkClick(character)}
      >
        <BookmarkIcon isBookmarked={isBookmarked} />
      </button>
      <button
        id="swap-left"
        className="card__bookmark--arrow card__bookmark--reorder__left"
        onClick={e => handleSwapCharacters(e, character.id)}
      >
        Move Left
      </button>
      <button
        id="swap-right"
        className="card__bookmark--arrow card__bookmark--reorder__right"
        onClick={e => handleSwapCharacters(e, character.id)}
      >
        Move Right
      </button>
    </div>
  );
};

export default CharacterCard;
