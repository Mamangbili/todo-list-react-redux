import { ListItem } from "./ListItem";
import { useFilter } from "./../context/constant";
import { useTodo } from "./../storage/useTodo";

const TodoList = () => {
  const { todo, dispatcher } = useTodo();
  const { filterState } = useFilter();

  const filteredData =
    filterState === "ALL"
      ? todo
      : todo.filter((todo) => todo.status === filterState);

  return (
    <>
      <ul>
        {filteredData.map((each) => {
          return <ListItem key={each.id} data={each} dispatcher={dispatcher} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
