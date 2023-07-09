import { useFetchTodosQuery } from "./todosSlice";

const TodosList = () => {
  const {
    data: todosData,
    isLoading: todosIsLoading,
    isError: todosIsError,
    error: todosError,
  } = useFetchTodosQuery();

  if (todosIsLoading) {
    return (
      <div className="m-10 flex w-auto justify-center">
        <div>loading</div>
      </div>
    );
  }

  if (todosIsError) {
    console.error(todosError);
    return <p>Server error. Try again later.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-10 pt-10 sm:p-10">
      <h1>
        {todosData?.map((todo, index) => (
          <div key={index}>
            <div>Type: {todo.description}</div>
            <div>Age: {todo.whoseTask}</div>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default TodosList;