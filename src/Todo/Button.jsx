const Button = ({
  onClick,
  className = "",
  children,
}) => {
  const style = "bg-[#6558f5] ";
  return (
    <>
      <button
        className={style + className}
        onClick={(e) => onClick(e)}>
        {children}
      </button>
    </>
  );
};

export default Button;
