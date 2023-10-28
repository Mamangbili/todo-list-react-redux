/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { createContext, useContext, useEffect, useState } from "react";
import { FilterProvider, useFilter } from "./context/filter-context";
import { useDispatch, useSelector } from "react-redux";
import useTodo from "./storage/useTodo";
import TodoList from "./Todo/List/ListTodo";

function App() {
  const { todo, dispatcher } = useTodo();
  const style = {
    container : "grid grid-cols-1 w-96 border-2 border-black mx-auto gap-2 p-2 ",
    title : "text-2xl text-center font-semibold"
  }
  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>What's the plan for today?</h1>
        <div className="flex gap-5">
          <AddTodo todo={todo} todoDispatcher={dispatcher} />
        </div>
        <FilterProvider>
          <ButtonFilter />
          <TodoList />
        </FilterProvider>
      </div>
    </>
  );
}

export default App;

const AddTodo = ({ todoDispatcher }) => {
  const style = {
    button: "py-1 px-2 text-white rounded-sm",
    input: "py-1 px-2 w-full outline-none border-slate-400 rounded-sm border-2",
  };

  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const onAdd = () => {
    todoDispatcher({ type: "ADD", payload: { todo: input } });
  };
  return (
    <>
      <input
        type="text"
        placeholder="What to do..."
        className={style.input}
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

const ButtonFilter = () => {
  const { filterState, setFilterState } = useFilter();
  const style = {
    container: "flex gap-5",
    button:
      "px-4 !w-auto py-1 text-white bg-slate-600 text-xs transition-all rounded-xl sm:text-sm",
  };
  return (
    <>
      <div className={style.container}>
        <Button
          onClick={(e) => setFilterState((prev) => "ALL")}
          className={`${style.button} + ${
            filterState === "ALL" ? " !bg-green-600 " : ""
          }`}>
          All
        </Button>
        <Button
          onClick={(e) => setFilterState((prev) => "COMPLETED")}
          className={`${style.button} + ${
            filterState === "COMPLETED" ? " !bg-green-600 " : ""
          }`}>
          COMPLETED
        </Button>
        <Button
          onClick={(e) => setFilterState((prev) => "ACTIVE")}
          className={`${style.button} + ${
            filterState === "ACTIVE" ? " !bg-green-600 " : ""
          }`}>
          ACTIVE
        </Button>
      </div>
    </>
  );
};

export const ListItem = ({ data, dispatcher }) => {
  const status = data.status === "COMPLETED" ? true : false;
  const style = {
    buttonContainer: " flex justify-center items-center",
    list: "grid grid-cols-11",
    p: " col-span-8 col-start-2",
    input: "col-start-1",
  };
  if (status) {
    style.buttonContainer += " hidden";
    style.p += " line-through";
  }
  const [onEdit, setOnEdit] = useState(false);
  const [input, setInput] = useState(data.todo);

  const cancelModal = () => {
    setModal((prev) => ({ ...prev, active: !prev.active }));
  };
  const deleted = () => {
    dispatcher({ payload: { id: data.id }, type: "DELETE" });
  };
  const edited = () => {
    dispatcher({
      payload: { id: data.id, todo: input, status: data.status },
      type: "UPDATE",
    });
  };
  const revert = () => {
    dispatcher({
      payload: { id: data.id, todo: data.todo, status: data.status },
      type: "REVERT_STATUS",
    });
  };
  const editHandler = () => {
    setOnEdit((prev) => !prev);
    const savedNow = onEdit;
    // masuk dari mode edit ke saved. pake value sebelum update render
    if (savedNow) edited();
    //
  };
  const [modal, setModal] = useState({
    component: (
      <Modal
        ok={deleted}
        cancel={cancelModal}
        title={"Peringatan Hapus"}
        description={"Apakah anda yakin ingin menghapus todo?"}
      />
    ),
    active: false,
  });
  const deleteHandler = (e) => {
    setModal((prev) => ({ ...prev, active: true }));
  };
  const inputHandler = (e) => {
    setInput((prev) => e.target.value);
  };
  let todoText = <p className={style.p}>{data.todo}</p>;
  if (onEdit) {
    todoText = <input value={input} onChange={(e) => inputHandler(e)} />;
  }
  return (
    <>
      {modal.active && modal.component}
      <li className={style.list}>
        <input
          checked={status}
          onChange={revert}
          type="checkbox"
          className={style.input}
        />
        {todoText}
        <div className={style.buttonContainer}>
          <Button onClick={editHandler} className={style.button}>
            <img
              src="https://icons-for-free.com/download-icon-pencil-1324438838284694541_256.ico"
              className="w-5 h-5"
            />
          </Button>
          <Button className={style.button} onClick={deleteHandler}>
            <img
              src="https://www.shareicon.net/data/256x256/2016/01/19/705545_recycle-bin_512x512.png"
              className="w-5 h-5"
            />
          </Button>
        </div>
      </li>
    </>
  );
};

const Modal = ({ ok, cancel, title, description }) => {
  const style = {
    container:
      " w-5/12 h-32 grid grid-rows-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2",
    p: " text-center row-span-2",
    title: " text-4xl",
    button: "  py-1 px-2",
    buttonWrapper: " flex justify-end gap-5 p-3 border-1 border-black",
  };
  return (
    <>
      <div className={style.container}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.p}>{description}</p>

        <div className={style.buttonWrapper}>
          <Button className={style.button + " bg-rose-600"} onClick={cancel} />
          <Button className={style.button + " bg-green-500"} onClick={ok} />
        </div>
      </div>
    </>
  );
};
