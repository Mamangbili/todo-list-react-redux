import { useDispatch, useSelector } from "react-redux";

export const useTodo = () => {
  const todo = useSelector((state) => state.todoReducer);
  const dispatcher = useDispatch();
  return { todo, dispatcher };
};
