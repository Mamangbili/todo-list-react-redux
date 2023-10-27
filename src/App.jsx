/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

function App() {
  return (
    <>
      <h1>What's the plan for today?</h1>
      <div>
        <Button className="bg-red-300"  />
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

const Input = () => {
  const [input, setIput] = useState();
  const inputHandler = (e) => {
    setIput(e.targer.value);
  };
  return (
    <>
      <input
        onChange={(e) => inputHandler(e)}
        value={input}
        type="text"
        placeholder="What to do"
      />
    </>
  );
};

const Button = ({
  onClick,
  width = "200px",
  height = "15%",
  className = "",
}) => {
  const style = "bg-[#6558f5] ";
  return (
    <>
      <button
        className={style + className}
        style={{ width:  width , height:  height  }}
        onClick={(e) => onClick(e)}>
        Add
      </button>
    </>
  );
};
