import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export const ListItem = ({ data, dispatcher }) => {
  const status = data.status === "COMPLETED" ? true : false;
  //style di dalam agar hasil mutate kembali ke awal ketika render baru
  const style = {
    buttonContainer: " grid grid-cols-2 col-span-2 gap-2 ",
    list: "grid grid-cols-11 border-slate-400 border-2 p-2 gap-2 h-14 box-border",
    todo: " col-span-8 col-start-2 my-auto pl-2 ",
    checkbox: "col-start-1 outline-1 h-full w-full",
    button: " w-full h-full bg-white",
    inputText: " decoration-0 outline-0 border-2   px-1 border-slate-500 ",
  };
  //states
  const [onEdit, setOnEdit] = useState(false);
  const [input, setInput] = useState(data.todo);
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
  //conditional rendering
  //menyebabkan mutate objek

  let todoText = <p className={style.todo}>{data.todo}</p>;
  if (onEdit && !status) {
    todoText = (
      <input
        autoFocus
        className={style.todo + style.inputText}
        value={input}
        onChange={(e) => inputHandler(e)}
        onKeyDown={(e) => onEnter(e)}
      />
    );
  }
  if (status) {
    //ini masih bisa karena Component dipanggil ketika render
    style.buttonContainer += " hidden";
    //ini harus dibuat ulang karena Component sudah dibuat sebelumnya sehingga sulit untuk di mutate
    style.todo += " line-through ";
    todoText = <p className={style.todo}>{data.todo}</p>;
  }
  console.log(todoText);
  console.log(style.todo);
  //method
  //pake fn biasa agar bisa di hoisting
  function onEnter(e) {
    if (e.key === "Enter") editHandler();
  }
  function cancelModal() {
    setModal((prev) => ({ ...prev, active: !prev.active }));
  }
  function deleted() {
    dispatcher({ payload: { id: data.id }, type: "DELETE" });
  }
  function edited() {
    dispatcher({
      payload: { id: data.id, todo: input, status: data.status },
      type: "UPDATE",
    });
  }
  function revert() {
    dispatcher({
      payload: { id: data.id, todo: data.todo, status: data.status },
      type: "REVERT_STATUS",
    });
  }
  function editHandler() {
    setOnEdit((prev) => !prev);
    const savedNow = onEdit;
    // masuk dari mode edit ke saved. pake value sebelum update render
    if (savedNow) edited();
  }

  function deleteHandler(e) {
    setModal((prev) => ({ ...prev, active: true }));
  }
  function inputHandler(e) {
    setInput((prev) => e.target.value);
  }

  return (
    <>
      {modal.active && modal.component}
      <li className={style.list}>
        <input
          checked={status}
          onChange={revert}
          type="checkbox"
          className={style.checkbox}
        />
        {todoText}
        <div className={style.buttonContainer}>
          <Button onClick={editHandler} className={style.button}>
            <img
              src="https://icons-for-free.com/download-icon-pencil-1324438838284694541_256.ico"
              className="w-full"
            />
          </Button>
          <Button className={style.button} onClick={deleteHandler}>
            <img
              src="https://www.shareicon.net/data/256x256/2016/01/19/705545_recycle-bin_512x512.png"
              className="w-full"
            />
          </Button>
        </div>
      </li>
    </>
  );
};
