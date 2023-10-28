import Button from "./Button";

export const Modal = ({ ok, cancel, title, description }) => {
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
export default Modal;
