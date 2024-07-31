import { useEffect, useState } from "react";
import Card from "./Card";
import md5 from "crypto-js/md5";
import _, { rest } from "lodash";

export default function CardContainer({
  characterData,
  setCharacterData,
  gameOver,
  setGameOver,
  handleScore,
  restartGame,
}) {
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  function handleRestart() {
    restartGame();
    setSelectedCharacters([]);
  }

  function renderNewCards() {
    const shuffled = _.shuffle(characterData);
    setCharacterData(shuffled);
    setCurrentCharacters(shuffled.slice(0, 6));
  }

  function selectCard(event) {
    //add selected card name to the selected character array
    // check gameOver
    //render new set of cards to the screen
    setCurrentCharacter(event.target.id);
    setSelectedCharacters((prevCharacters) => {
      return [...prevCharacters, event.target.id];
    });
    handleScore();
    renderNewCards();
  }
  useEffect(() => {
    if (!gameOver) {
      const uniqueElements = new Set(selectedCharacters);

      if (selectedCharacters.length > uniqueElements.size) {
        setGameOver(true);

        console.log("Game over");
      } else {
      }
    }
  }, [selectedCharacters]);

  useEffect(() => {
    setCurrentCharacters(characterData.slice(0, 6));
  }, [characterData]);

  useEffect(() => {
    if (gameOver) {
      handleRestart();
    }
  }, [gameOver]);
  return (
    <div className="CardContainer">
      {currentCharacters.map((char) => (
        <Card
          key={char.name}
          imageUrl={char.imageUrl}
          name={char.name}
          selectCard={selectCard}
        />
      ))}
    </div>
  );
}
