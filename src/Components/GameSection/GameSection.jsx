import React, { useState, useEffect } from "react";
import css from "../../Components/GameSection/GameSection.module.css";
import X from "../../assets/cross.svg";
import O from "../../assets/zero.svg";
import refresh from "../../assets/refresh.svg";

let arr = [null, null, null, null, null, null, null, null, null];

const GameSection = ({ onQuit }) => {
  const [active, setActive] = useState(false);
  const [squares, setSquares] = useState(arr);
  const [playerTurn, setPlayerTurn] = useState("cross");
  const [scores, setScores] = useState({ user: 0, ties: 0, computer: 0 });

  useEffect(() => {
    if (playerTurn === "zero") {
      const timeoutId = setTimeout(() => {
        computerTurn();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [playerTurn, squares]);

  const handleClick = (index) => {
    if (squares[index] === null && playerTurn === "cross") {
      const squaresCopy = [...squares];
      squaresCopy[index] = playerTurn;
      setSquares(squaresCopy);

      const winner = calculateWinner(squaresCopy);
      if (winner) {
        handleGameEnd(winner);
      } else {
        setPlayerTurn("zero");
      }
    }
  };

  const calculateWinner = (squaresCopy) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squaresCopy[a] &&
        squaresCopy[a] === squaresCopy[b] &&
        squaresCopy[a] === squaresCopy[c]
      ) {
        return squaresCopy[a];
      }
    }

    if (squaresCopy.every((square) => square !== null)) {
      return "tie";
    }

    return null;
  };

  const handleGameEnd = (winner) => {
    if (winner === "cross") {
      setScores((prevScores) => ({ ...prevScores, user: prevScores.user + 1 }));
    } else if (winner === "zero") {
      setScores((prevScores) => ({
        ...prevScores,
        computer: prevScores.computer + 1,
      }));
    } else if (winner === "tie") {
      setScores((prevScores) => ({ ...prevScores, ties: prevScores.ties + 1 }));
    }

    setActive(true);
  };

  const computerTurn = () => {
    const squaresCopy = [...squares];
    const availableSquares = squaresCopy
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    if (availableSquares.length > 0) {
      const randomIndex =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];
      squaresCopy[randomIndex] = "zero";
      setSquares(squaresCopy);

      const winner = calculateWinner(squaresCopy);
      if (winner) {
        handleGameEnd(winner);
      } else {
        setPlayerTurn("cross");
      }
    }
  };

  const resetGame = () => {
    setSquares(arr);
    setActive(false);
  };

  const renderTurnImage = () => {
    return playerTurn === "cross" ? (
      <img src={X} alt="Cross" />
    ) : (
      <img src={O} alt="Zero" />
    );
  };

  return (
    <>
      <div className={css.GameSection}>
        <div className={css.top}>
          <div className={css.img}>
            <img src={X} alt="" />
            <img src={O} alt="" />
          </div>
          <div className={css.turn}>
            <div>{renderTurnImage()}</div>
            <div className={css.text}> TURN</div>
          </div>
          <div
            className={css.refresh}
            onClick={() => {
              setActive(true);
            }}>
            <img src={refresh} alt="" />
          </div>
        </div>
        <div className={css.gameBoard}>
          {squares.map((value, index) => (
            <div
              key={index}
              className={css.kids}
              onClick={() => handleClick(index)}>
              {value === "cross" && <img src={X} alt="Cross" />}
              {value === "zero" && <img src={O} alt="Zero" />}
            </div>
          ))}
        </div>
        <div className={css.score1}>
          <span>X (YOU)</span>
          <span>{scores.user}</span>
        </div>
        <div className={css.score2}>
          <span>TIES</span>
          <span>{scores.ties}</span>
        </div>
        <div className={css.score3}>
          <span>O (CPU)</span>
          <span>{scores.computer}</span>
        </div>
        {active && (
          <div className={css.overlay}>
            <div className={css.dialogOverlay}>
              <div className={css.message}>Do you want to quit ?</div>
              <div className={css.choice}>
                <button className={css.btn1} onClick={resetGame}>
                  PLAY AGAIN
                </button>
                <button className={css.btn2} onClick={onQuit}>
                  QUIT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GameSection;
