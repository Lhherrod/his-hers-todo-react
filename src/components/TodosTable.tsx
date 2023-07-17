import { Card } from "primereact/card";
import { useState } from "react";
import { useFetchTodosQuery } from "../features/todos/todosSlice";
import { ReadTodo } from "../interfaces/Todo";
import AddTodo from "./AddTodo";
import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

const TodosTable = () => {
  const hisTodos: ReadTodo[] = [];
  const herTodos: ReadTodo[] = [];

  const [herSelectedtodo, setHerSelectedtodo] = useState(-1);
  const [hisSelectedtodo, setHisSelectedtodo] = useState(-1);

  //we get todo data from our query store its ran when this components mounts
  const {
    data: todosData,
    isLoading: todosIsLoading,
    isError: todosIsError,
    error: todosError,
  } = useFetchTodosQuery();

  todosData?.map((todo) =>
    todo.whoseTodo.name === "his" ? hisTodos.push(todo) : herTodos.push(todo)
  );

  if (todosIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading... 😀 Please wait...</p>
      </div>
    );
  }

  if (todosIsError) {
    console.error(todosError);
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Sorry! Server error. 😔 Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card>
        <h1 className="text-center text-purple-400 text-3xl md:text-5xl">
          Her Todos
        </h1>
        <div id="her-todo-div">
          <ul className="bg-pink-300 p-4 mb-6">
            {!herTodos.length && <p>She doesn't have any todos...</p>}
            {herTodos.map((todo, index) => (
              <li
                className={
                  herSelectedtodo === index ? "text-green-500" : "text-red-500"
                }
                onClick={() => {
                  setHerSelectedtodo(index);
                }}
                key={index}
              >
                <div className="select-none bg-gray-200 rounded-md p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-4">
                  <div className="mb-1">
                    <div className="flex rounded-md w-10 h-10 bg-gray-300 justify-center items-center">
                      ⚽️
                    </div>
                    <p className="font-medium">{todo.description}</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    This todo is public...
                  </p>
                  <div className="flex space-x-2 justify-end">
                    <UpdateTodo todo={todo} />
                    <DeleteTodo todoId={todo.id} whoseTodo={todo.whoseTodo} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <AddTodo whoseTodo={"hers"} />
        </div>
      </Card>

      <Card className="mt-10">
        <h1 className="text-center text-indigo-800 text-3xl md:text-5xl">
          His todos
        </h1>
        <div className="his-todo-div">
          <ul className="bg-blue-300 p-4 mb-6">
            {!hisTodos.length && <p>He doesn't have any todos...</p>}
            {hisTodos.map((todo, index) => (
              <li
                className={
                  hisSelectedtodo === index ? "text-green-500" : "text-red-500"
                }
                onClick={() => {
                  setHisSelectedtodo(index);
                }}
                key={index}
              >
                <div className="select-none bg-gray-200 rounded-md p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-4">
                  <div className="mb-1">
                    <div className="flex rounded-md w-10 h-10 bg-gray-300 justify-center items-center">
                      ⚽️
                    </div>
                    <p className="font-medium">{todo.description}</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    This todo is public...
                  </p>
                  <div className="flex space-x-2 justify-end">
                    <UpdateTodo todo={todo} />
                    <DeleteTodo todoId={todo.id} whoseTodo={todo.whoseTodo} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <AddTodo whoseTodo={"his"} />
        </div>
      </Card>
    </div>
  );
};

export default TodosTable;