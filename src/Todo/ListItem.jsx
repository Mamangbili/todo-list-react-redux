import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const style = {
  buttonContainer: " flex justify-center items-center",
  list: "grid grid-cols-11",
  p: " col-span-8 col-start-2",
  input: "col-start-1",
};

export const ListItem = ({ data, dispatcher }) => {
  const status = data.status === "COMPLETED" ? true : false;

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
  if (status) {
    style.buttonContainer += " hidden";
    style.p += " line-through";
  }
  let todoText = <p className={style.p}>{data.todo}</p>;
  if (onEdit) {
    todoText = <input value={input} onChange={(e) => inputHandler(e)} />;
  }

  //method
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
              className="w-12 h-5"
            />
          </Button>
        </div>
      </li>
    </>
  );
};
