import copy from "copy-to-clipboard";
import { useState } from "react";
import fraganciasAerosol from "./json/aerosoles.js";

import aerosoles from "./json/aerosoles.js";
import textiles from "./json/textiles.js";
import varillas from "./json/varillas.js";

import allFragancias from "./json/aero+text+varillas";
function calculateTotal(array) {
  let x = 0;
  array.forEach((element) => {
    x += element.quantity;
  });
  return x;
}
export default function () {
  const [buttonSelected, setButtonSelected] = useState("aerosoles");
  const [typing, setTyping] = useState("");

  const [aerosolesHistory, setAerosolesHistory] = useState([]);
  const [textilesHistory, setTextilesHistory] = useState([]);
  const [varillasHistory, setVarillasHistory] = useState([]);
  const [multipleSearchClickValue, setMultipleSearchClickValue] = useState("");

  function saveToClipboard() {
    const aero = `Aerosoles (${calculateTotal(
      aerosolesHistory
    )}): ${aerosolesHistory.map((el) => ` ${el.name} (${el.quantity})`)}
    `;
    const text = `\nTextiles (${calculateTotal(
      textilesHistory
    )}): ${textilesHistory.map((el) => ` ${el.name} (${el.quantity})`)}
    `;
    const varr = `\nVarillas (${calculateTotal(
      varillasHistory
    )}): ${varillasHistory.map((el) => ` ${el.name} (${el.quantity})`)}
    `;

    copy(aero + text + varr);
  }
  function addToAerosoles(nameInput, amount) {
    if (aerosolesHistory.some((object) => object.name === nameInput)) {
      setAerosolesHistory(
        aerosolesHistory.map((element) => {
          if (element.name === nameInput) {
            return { ...element, quantity: (element.quantity += amount) };
          } else return element;
        })
      );
    } else {
      setAerosolesHistory([
        ...aerosolesHistory,
        { name: nameInput, quantity: amount },
      ]);
    }
  }
  function addToTextiles(nameInput, amount) {
    if (textilesHistory.some((object) => object.name === nameInput)) {
      setTextilesHistory(
        textilesHistory.map((element) => {
          if (element.name === nameInput) {
            return { ...element, quantity: (element.quantity += amount) };
          } else return element;
        })
      );
    } else {
      setTextilesHistory([
        ...textilesHistory,
        { name: nameInput, quantity: amount },
      ]);
    }
  }
  function addToVarillas(nameInput, amount) {
    if (varillasHistory.some((object) => object.name === nameInput)) {
      setVarillasHistory(
        varillasHistory.map((element) => {
          if (element.name === nameInput) {
            return { ...element, quantity: (element.quantity += amount) };
          } else return element;
        })
      );
    } else {
      setVarillasHistory([
        ...varillasHistory,
        { name: nameInput, quantity: amount },
      ]);
    }
  }
  function handleMultipleSearchClick(name) {
    setMultipleSearchClickValue(name);
  }

  function handleSearchClick(name, amount = 1) {
    setTyping("");
    buttonSelected === "aerosoles" && addToAerosoles(name, amount);
    buttonSelected === "textiles" && addToTextiles(name, amount);
    buttonSelected === "varillas" && addToVarillas(name, amount);
  }
  function handleDeleteHistory(name, arrayType) {
    const handleDelete = (array, setter, target) => {
      const index = array.findIndex((el) => el.name === target);
      const shouldDelete = array[index].quantity === 1;
      if (shouldDelete) {
        setter(array.filter((element) => element.name !== target));
      } else {
        setter(
          array.map((element) => {
            if (element.name === target) {
              return { ...element, quantity: (element.quantity -= 1) };
            } else {
              return element;
            }
          })
        );
      }
    };
    arrayType === "Aerosoles" &&
      handleDelete(aerosolesHistory, setAerosolesHistory, name);
    arrayType === "Textiles" &&
      handleDelete(textilesHistory, setTextilesHistory, name);
    arrayType === "Varillas" &&
      handleDelete(varillasHistory, setVarillasHistory, name);
  }

  return (
    <div className="align-container">
      <div id="main-container">
        <div id="button-container">
          <button
            onClick={() => setButtonSelected("aerosoles")}
            style={{
              backgroundColor: buttonSelected === "aerosoles" && "#ae5f5f",
            }}
          >
            AEROSOLES
          </button>

          <button
            onClick={() => setButtonSelected("textiles")}
            style={{
              backgroundColor: buttonSelected === "textiles" && "#ae5f5f",
            }}
          >
            TEXTILES
          </button>
          <button
            onClick={() => setButtonSelected("varillas")}
            style={{
              backgroundColor: buttonSelected === "varillas" && "#ae5f5f",
            }}
          >
            VARILLAS
          </button>
        </div>

        <MultipleSelector
          handleSearchClick={handleSearchClick}
          multipleSearchClickValue={multipleSearchClickValue}
          setMultipleSearchClickValue={setMultipleSearchClickValue}
        />
        <SearchBar
          handleMultipleSearchClick={handleMultipleSearchClick}
          handleSearchClick={handleSearchClick}
          setTyping={setTyping}
          typing={typing}
        />

        <History
          handleDeleteHistory={handleDeleteHistory}
          aerosolesHistory={aerosolesHistory}
          textilesHistory={textilesHistory}
          varillasHistory={varillasHistory}
        />
        <SaveButton
          saveToClipboard={saveToClipboard}
          aerosolesHistory={aerosolesHistory}
          textilesHistory={textilesHistory}
          varillasHistory={varillasHistory}
        />
      </div>
    </div>
  );
}
function MultipleSelector({
  handleSearchClick,
  multipleSearchClickValue,
  setMultipleSearchClickValue,
}) {
  const [multipleAmount, setMultipleAmount] = useState(1);
  return (
    <>
      <div
        style={{
          display: multipleSearchClickValue !== "" ? "flex" : "none",
        }}
        id="multiple-selector-container"
      >
        <div className="multiple-selector-container-child">Amount</div>
        <div className="multiple-selector-container-child">
          {multipleAmount}
        </div>
        <div className="modifiers-container">
          <div
            onClick={() => setMultipleAmount(multipleAmount + 1)}
            className="modifiers-sub-container"
            id="modifier-plus"
          >
            <i className="gg-math-plus"></i>
          </div>
          <div
            id="modifier-minus"
            onClick={() => {
              if (multipleAmount > 0) {
                setMultipleAmount(multipleAmount - 1);
              }
            }}
            className="modifiers-sub-container"
          >
            <i className="gg-math-minus"></i>
          </div>
        </div>
        <div
          onClick={() => {
            multipleAmount > 0 &&
              handleSearchClick(multipleSearchClickValue, multipleAmount);
            setMultipleAmount(1);
            setMultipleSearchClickValue("");
          }}
          className="multiple-save-container"
        >
          Save
        </div>
      </div>
    </>
  );
}
function SearchBar({
  handleMultipleSearchClick,
  handleSearchClick,
  setTyping,
  typing,
}) {
  return (
    <>
      <div className="search-bar-container">
        <input
          autoFocus={true}
          onChange={(e) => {
            setTyping(e.target.value.toUpperCase());
          }}
          value={typing}
          id="search-bar"
          type="text"
        />
        <i className="gg-search"></i>
      </div>

      <div
        id="results-container"
        style={{
          marginTop: "4px",
        }}
      >
        {allFragancias
          .filter((el) => el.name.toUpperCase().includes(typing.toUpperCase()))
          .filter((_el, index) => index < 4)
          .map((object) => {
            return (
              <div className="drop-drown" key={object.id}>
                <div
                  className="name-container"
                  onClick={() => handleSearchClick(object.name)}
                >
                  {object.name}
                </div>
                <div
                  onClick={() => handleMultipleSearchClick(object.name)}
                  className="extra-container"
                >
                  <i className="gg-menu"></i>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
function History({
  handleDeleteHistory,
  aerosolesHistory,
  textilesHistory,
  varillasHistory,
}) {
  return (
    <>
      <HistoryMiniComponent
        handleDeleteHistory={handleDeleteHistory}
        array={aerosolesHistory}
        name="Aerosoles"
      />
      <HistoryMiniComponent
        handleDeleteHistory={handleDeleteHistory}
        array={textilesHistory}
        name="Textiles"
      />
      <HistoryMiniComponent
        handleDeleteHistory={handleDeleteHistory}
        array={varillasHistory}
        name="Varillas"
      />
    </>
  );
}
function HistoryMiniComponent({ handleDeleteHistory, array, name }) {
  const shouldShow = array.length > 0;
  return (
    <div id={name.toUpperCase()} className="history-container">
      <div style={{ display: shouldShow ? "block" : "none" }} className="title">
        {name}
      </div>
      {array.map((element) => {
        return (
          <div
            key={element.name}
            onClick={() => handleDeleteHistory(element.name, name)}
            className="history-name-container"
          >
            <i className="gg-trash"></i>
            {element.name} ({element.quantity})
          </div>
        );
      })}
    </div>
  );
}
function SaveButton({
  saveToClipboard,
  aerosolesHistory,
  textilesHistory,
  varillasHistory,
}) {
  const shouldShow =
    aerosolesHistory.length > 0 ||
    textilesHistory.length > 0 ||
    varillasHistory.length > 0;
  if (!shouldShow) {
    return <></>;
  }

  return (
    <button onClick={saveToClipboard} className="save-button">
      GUARDAR
    </button>
  );
}
