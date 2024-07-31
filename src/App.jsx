import { useState, useEffect } from "react";
import md5 from "crypto-js/md5";
import { privateKey, publicKey } from "./config";
import allCharacters from "./allCharacters";
import Card from "./Card";
import "./style.css";

import CardContainer from "./CardContainer";
function App() {
  const [characterData, setCharacterData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  function handleScore() {
    if (!gameOver) {
      setScore((prevScore) => {
        return (prevScore += 1);
      });
    }

    if (score > bestScore) {
      setBestScore(score);
    }
  }

  useEffect(() => {
    setScore(score);
  }, [score]);

  function checkGameOver() {
    const uniqueElements = new Set(selectedCharacters);

    if (selectedCharacters.length > uniqueElements.size) {
      setGameOver(true);
      console.log("Game over");
    }
  }

  function restartGame() {
    setScore(0);
    setGameOver(!gameOver);
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const ts = Date.now().toString();
        const hash = md5(ts + privateKey + publicKey);
        const requests = allCharacters.map((characterName) => {
          return fetch(
            `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
          )
            .then((response) => response.json())
            .then((data) => {
              const characterData = data.data.results[0];
              return {
                name: characterData.name,
                imageUrl: characterData.thumbnail.path + ".jpg",
              };
            });
        });
        const results = await Promise.all(requests);
        console.log(results);
        setCharacterData(results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log("new chracter data", characterData);
  }, [characterData]);

  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem("bestScore", bestScore);
    }
  }, [bestScore]);

  useEffect(() => {
    const savedBestScore = localStorage.getItem("bestScore");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  return (
    <div>
      {isloading ? (
        <h1 className="loadingText">...loading</h1>
      ) : (
        <div>
          <div>
            <div className="score">
              <p>Score: {score}</p>
              <p>Best Score: {bestScore}</p>
            </div>
          </div>
          {!gameOver ? (
            <CardContainer
              characterData={characterData}
              setCharacterData={setCharacterData}
              gameOver={gameOver}
              setGameOver={setGameOver}
              handleScore={handleScore}
              restartGame={restartGame}
            />
          ) : (
            <div>
              <div className="gameOverText">
                <h1>Game Over</h1>
                <p>Click Caps shield to restart the game</p>
              </div>
              <div
                className="modal"
                style={gameOver ? { display: "block" } : { display: "none" }}
                onClick={restartGame}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
