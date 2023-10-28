import { ListItem } from "./ListItem";
import { useFilter } from "./../context/constant";
import { useTodo } from "./../storage/useTodo";

const TodoList = () => {
  const { todo, todoMethod } = useTodo();
  const { filterState } = useFilter();

  const filteredData =
    filterState === "ALL"
      ? todo
      : todo.filter((todo) => todo.status === filterState);

  return (
    <>
      <div className="overflow-y-auto h-96 p-2">
        <ul className="grid grid-cols-1 gap-4 transition ">
          {filteredData.map((each) => {
            return <ListItem key={each.id} data={each} action={todoMethod} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
