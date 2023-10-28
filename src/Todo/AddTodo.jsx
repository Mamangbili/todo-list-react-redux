import { useState } from "react";
import Button from "./Button";

const style = {
  button: "py-1 px-2 text-white rounded-sm",
  input: "py-1 px-2 w-full outline-none border-slate-400 rounded-sm border-2",
};
export const AddTodo = ({ todoDispatcher }) => {
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const onAdd = (e) => {
    todoDispatcher({ type: "ADD", payload: { todo: input } });
    e.target.blur();
    setInput("");
  };
  function onEnter(e) {
    if (e.key === "Enter") {
      onAdd(e);
    }
  }
  return (
    <>
      <input
        type="text"
        placeholder="What to do..."
        className={style.input}
        onChange={(e) => inputHandler(e)}
        onKeyDown={(e) => onEnter(e)}
        value={input}
      />

      <Button onClick={(e) => onAdd(e)} className={style.button}>
        Add
      </Button>
    </>
  );
};
