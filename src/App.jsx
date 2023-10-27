/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { createContext, useContext, useState } from "react";

const buttonStatusContext = createContext();
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

      <Button onClick={(e) => onAdd(e)} className={style.button}>
        Add
      </Button>
    </>
  );
};

const Button = ({
  onClick,
  width = "15%",
  height = "100%",
  className = "",
  children,
}) => {
  const style = "bg-[#6558f5] ";
  return (
    <>
      <button
        className={style + className}
        style={{ width: width, height: height }}
        onClick={(e) => onClick(e)}>
        {children}
      </button>
    </>
  );
};

const ButtonStatus = () => {
  const [status, setStatus] = useContext(buttonStatusContext);
  const style = {
    container: "flex gap-5",
    button: "px-2 py-1 text-white bg-slate-600 ",
  };
  return (
    <>
      <div className={style.container}>
        <Button
          text="ALL"
          className={`${style.button} + ${
            status === "ALL" ? "bg-green-600 " : ""
          }`}
        />
        <Button
          text="ACTIVE"
          className={`${style.button} + ${
            status === "ACTIVE" ? "bg-green-600 " : ""
          }`}
        />
        <Button
          text="COMPLETED"
          className={`${style.button} + ${
            status === "COMPLETED" ? "bg-green-600 " : ""
          }`}
        />
      </div>
    </>
  );
};

const ListItem = ({ data, dispatcher }) => {
  const status = data.status === "COMPLETED" ? true : false;
  const style = {
    buttonContainer: " flex justify-center grid-s items-center",
    list: "grid grid-cols-11",
    p: " col-span-8 col-start-2",
    input: "col-start-1",
  };
  if (status) {
    style.buttonContainer += " hidden";
    style.p += " line-through";
  }
  const [onEdit, setOnEdit] = useState(false)
  const [input, setInput]  = useState(data.todo)
  
  let todoText  =<p className={style.p}>isi lis</p> 
  if(onEdit){
     todoText = <input value={data.todo} onChange={e=>setInput(e.target.value)} />  
  }
  
  const Deleted = () => {
    dispatcher({id:data.id, method:"DELETE"})
  }
  const Edited = () => {
    dispatcher({id:data.id, method:"COMPLETED", todo:input})
  }
  const checkboxHandler = () => {
    setOnEdit(!onEdit)
  }
  return (
    <>
      <li>
        <input checked={data.status} onClick={checkboxHandler}  type="checkbox" className={style.input} />
        {todoText}
        <div className={style.buttonContainer}>
          <Button className={style.button}>
            <img src="" />
          </Button>
          <Button className={style.button}>
            <img src="" />
          </Button>
        </div>
      </li>
    </>
  );
};
