import { useDispatch, useSelector } from "react-redux";

export const useTodo = () => {
  const todo = useSelector((state) => state.todoReducer);
  const dispatcher = useDispatch();

  const actionMethodSelect = (actionMethod) => (payload) =>
    dispatcher({ type: actionMethod, payload });

  const todoMethod = {
    DELETE: actionMethodSelect("DELETE"),
    ADD: actionMethodSelect("ADD"),
    UPDATE: actionMethodSelect("UPDATE"),
    REVERT_STATUS: actionMethodSelect("REVERT_STATUS"),
  };

  return { todo,  todoMethod };
};
