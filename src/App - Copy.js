import { useState } from "react";
import fraganciasAerosol from "./json/aerosoles.js";

import aerosoles from "./json/aerosoles.js";
import textiles from "./json/textiles.js";
import varillas from "./json/varillas.js";

let fraganciasFilter = [];

export default function () {
  const [buttonSelected, setButtonSelected] = useState("aerosoles");
  const [typing, setTyping] = useState("");
  const [history, setHistory] = useState([]);

  const [aerosolesHistory, setAerosolesHistory] = useState([]);
  const [textilesHistory, setTextilesHistory] = useState([]);
  const [varillasHistory, setVarillasHistory] = useState([]);

  function onSearchClick(objectClicked) {
    setTyping("");

    if (history.some((el) => el.name === objectClicked.name)) {
      setHistory(
        history.map((element, index) => {
          if (element.name == objectClicked.name) {
            return { ...element, quantity: (element.quantity += 1) };
          } else {
            return element;
          }
        })
      );
    } else {
      setHistory([
        ...history,
        { ...objectClicked, quantity: 1, type: buttonSelected },
      ]);
    }
  }

  return (
    <div id="main-container">
      <div id="button-container">
        <button
          onClick={() => {
            setButtonSelected("aerosoles");
          }}
          style={{
            backgroundColor: buttonSelected === "aerosoles" && "#ae5f5f",
          }}
        >
          AEROSOLES
        </button>
        <button
          onClick={() => {
            setButtonSelected("textiles");
          }}
          style={{
            backgroundColor: buttonSelected === "textiles" && "#ae5f5f",
          }}
        >
          TEXTILES
        </button>
        <button
          onClick={() => {
            setButtonSelected("varillas");
          }}
          style={{
            backgroundColor: buttonSelected === "varillas" && "#ae5f5f",
          }}
        >
          VARILLAS
        </button>
      </div>

      <SearchBar
        onClick={onSearchClick}
        setTyping={setTyping}
        typing={typing}
      />
      <History
        onDelete={(id) => {
          const index = history.findIndex((element) => element.id === id);
          if (history[index].quantity === 1) {
            setHistory(history.filter((element) => element.id !== id));
            return;
          }
          setHistory(
            history.map((element) => {
              if (element.id === id) {
                return { ...element, quantity: (element.quantity -= 1) };
              } else {
                return element;
              }
            })
          );
        }}
        array={history}
      />
    </div>
  );
}

function SearchBar({ onClick, setTyping, typing }) {
  fraganciasFilter = fraganciasAerosol.filter((element) =>
    element.name.toUpperCase().includes(typing.toUpperCase())
  );
  return (
    <>
      <input
        autoFocus={true}
        onChange={(e) => {
          setTyping(e.target.value.toUpperCase());
        }}
        value={typing}
        id="search-bar"
        type="text"
      ></input>
      <div
        style={{
          marginTop: "4px",
        }}
      >
        {fraganciasFilter
          .filter((element, index) => index < 3)
          .map((element) => {
            return (
              <div
                onClick={() => {
                  onClick(element);
                }}
                key={element.id}
                className="drop-drown"
              >
                {element.name}
              </div>
            );
          })}
      </div>
    </>
  );
}
function History({ array, onDelete }) {
  return (
    <div className="history-container">
      {array.map((element) => {
        return (
          <div>
            <div
              onClick={() => {
                onDelete(element.id);
              }}
              className="cross-button"
            >
              X
            </div>
            {element.name} ({element.quantity})
          </div>
        );
      })}
    </div>
  );
}
