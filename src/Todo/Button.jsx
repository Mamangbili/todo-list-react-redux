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

export default Button;
