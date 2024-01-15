import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameSection from "../../Components/GameSection/GameSection";
import CrossIcon from "../../assets/cross.svg";
import ZeroIcon from "../../assets/zero.svg";
import InZeroIcon from "../../assets/inzero.svg";
import InCrossIcon from "../../assets/incross.svg";
import css from "../GameCard/GameCard.module.css";

const copied = () => {
  toast.success("Invite link copied", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const handleSelect = (setSelected, playerType) => {
  setSelected(playerType);
};

const GameCard = () => {
  const [selected, setSelected] = useState(null);
  const [showGame, setShowGame] = useState(false);

  const startGame = () => {
    setShowGame(true);
  };

  const quitGame = () => {
    setShowGame(false);
  };


  return showGame ? (
    <GameSection selected={selected}  onQuit={quitGame}/>
  ) : (
    <>
      <div className={css.Card}>
        <div className={css.Container}>
          <img src={CrossIcon} alt="Cross" />
          <img src={ZeroIcon} alt="Zero" />
        </div>
        <div className={css.User}>
          <div>
            <h1 className={css.h1}>PICK PLAYER </h1>
          </div>
          <div className={css.choice}>
            <button
              className={`${css.choice1} ${selected === "cross" ? css.selected : ""}`}
              onClick={() => handleSelect(setSelected, "cross")}
            >
              <img src={InCrossIcon} alt="Cross Icon" />
            </button>
            <button
              className={`${css.choice2} ${selected === "zero" ? css.selected : ""}`}
              onClick={() => handleSelect(setSelected, "zero")}
            >
              <img src={InZeroIcon} alt="Zero Icon" />
            </button>
          </div>
        </div>
        <div className={css.buttons}>
          <div>
            <button className={css.button1} onClick={startGame}>
              NEW GAME ( VS CPU )
            </button>
          </div>
          <div>
            <button className={css.button2} disabled>
              NEW GAME ( VS HUMAN ) Coming soon
            </button>
          </div>
          <div>
            <button className={css.button3} onClick={() => { copied(); copyToClipboard(); }}>
              Invite your friend
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
