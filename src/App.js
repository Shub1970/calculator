import "./App.css";
import { valOpert, valOpertName } from "./data";
import { useState } from "react";

function compare(e) {
  const arr = ["*", "/", "-", "+"];
  return arr.find(function (val) {
    return val === e;
  });
}
function App() {
  const [disp, setDisp] = useState("");
  const [input, setInput] = useState("0");
  const handelClear = () => {
    setDisp("");
    setInput("0");
  };
  const handelEqual = () => {
    let value = Function("return " + disp)();
    setDisp((previous) => previous + "=" + value);
    setInput(value);
  };
  const handelLeftButton = (event) => {
    setDisp((previous) => {
      return previous + event.target.value;
    });
    setInput((previous) => {
      if (compare(event.target.value)) {
        if (disp.includes("=")) {
          let finalExpression = disp.slice(disp.search("=") + 1);
          setDisp(finalExpression + event.target.value);
        }
        return event.target.value;
      } else {
        if (previous === "0") {
          return event.target.value;
        } else {
          return compare(previous)
            ? event.target.value
            : previous + event.target.value;
        }
      }
    });
  };
  const handelDecimal = (event) => {
    if (!input.includes(".")) {
      setInput((previous) => previous + event.target.value);
      setDisp((previous) => previous + event.target.value);
    }
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="outputScreen">
          <div className="equation" value={disp}>
            {disp}
          </div>
          <div className="keyInput" id="display" value={input}>
            {input}
          </div>
        </div>
        <div className="input_key">
          <button id="clear" onClick={() => handelClear()}>
            AC
          </button>
          {valOpert.map((value, index) => {
            return (
              <button
                key={value.toString()}
                id={valOpertName[index]}
                value={value}
                onClick={(event) => {
                  handelLeftButton(event);
                }}
              >
                {value}
              </button>
            );
          })}
          <button
            id="decimal"
            value="."
            onClick={(event) => handelDecimal(event)}
          >
            .
          </button>
          <button
            id="equals"
            onClick={(event) => {
              handelEqual(event);
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
