import FilterProvider from "./context/filterProvider";
import { useTodo } from "./storage/useTodo";
import TodoList from "./Todo/ListTodo";
import { AddTodo } from "./Todo/AddTodo";
import { ButtonFilter } from "./Todo/ButtonFilter";

const style = {
  container:
    " transition-all duration-1000 grid grid-cols-1 w-96 border-2 border-black mx-auto gap-5 p-2 mt-20",
  title: "text-2xl text-center font-semibold",
};

function App() {
  const { todo, dispatcher } = useTodo();
  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>What's the plan for today?</h1>
        <div className="flex gap-5">
          <AddTodo todo={todo} todoDispatcher={dispatcher} />
        </div>
        <FilterProvider>
          <ButtonFilter />
          <TodoList />
        </FilterProvider>
      </div>
    </>
  );
}

export default App;
