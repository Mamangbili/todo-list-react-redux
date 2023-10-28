import Button from "./Button";
import PropTypes from "prop-types"
export const Modal = ({ ok, cancel, title, description }) => {
  const style = {
    container:
      " w-5/12 h-32 grid grid-rows-4 rounded-xl  fixed m-auto bg-slate-300 p-2 ",
    p: " text-center row-span-2 p-2",
    title: " text-2xl border-b-2 border-slate-400 box-border ",
    button: "  py-1 px-2 rounded-sm",
    buttonWrapper:
      " w-full h-full flex justify-end gap-5 border-1 border-black",
    bg: " bg-gray-200 w-screen h-screen fixed top-0 left-0 opacity-50",
  };
  return (
    <>
      <div className={style.bg}></div>
      <div className={style.container}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.p}>{description}</p>

        <div className={style.buttonWrapper}>
          <Button className={style.button + " bg-rose-600"} onClick={cancel}>
            cancel
          </Button>
          <Button className={style.button + " bg-green-500"} onClick={ok}>
            ok
          </Button>
        </div>
      </div>
    </>
  );
};
export default Modal;
Modal.propTypes = {
  title : PropTypes.string.isRequired,
  description : PropTypes.string.isRequired,
  ok : PropTypes.func.isRequired,
  cancel : PropTypes.func.isRequired
  
}