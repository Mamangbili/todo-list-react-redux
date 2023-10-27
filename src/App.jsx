/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

function App() {
  return (
    <>
      <h1>What's the plan for today?</h1>
      <div>
        <Button className="bg-red-300" />
      </div>

      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>

      <ul>
        <li></li>
      </ul>
    </>
  );
}

export default App;

const InputForm = (onAdd) => {
  const style = {
    button: "py-1 px-2 text-white",
    input: "py-1 px-2 w-full",
  };

  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        placeholder="What to do..."
        style={style.input}
        onChange={(e) => inputHandler(e)}
        value={input}
      />

      <Button text="Add" onClick={(e) => onAdd(e)} className={style.button} />
    </>
  );
};

const Button = ({
  onClick,
  width = "15%",
  height = "100%",
  className = "",
  text = "",
}) => {
  const style = "bg-[#6558f5] ";
  return (
    <>
      <button
        className={style + className}
        style={{ width: width, height: height }}
        onClick={(e) => onClick(e)}>
        {text}
      </button>
    </>
  );
};
