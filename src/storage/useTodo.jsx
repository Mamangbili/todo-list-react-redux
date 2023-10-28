import { useDispatch, useSelector } from "react-redux";

const useTodo = () => {
  const todo = useSelector((state) => state.todoReducer);
  const dispatcher = useDispatch();
  return { todo, dispatcher };
};

export default useTodo