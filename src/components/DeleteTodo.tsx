import { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import DeleteTodoForm from "./DeleteTodoForm";
import { useDeleteTodoMutation } from "../features/todos/todosSlice";

interface Props {
  todoId: string;
  whoseTodo: { name: string };
}

const DeleteTodo = ({ todoId, whoseTodo }: Props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [isLoading, setIsLoading] = useState(false);

  const dialogFuncMap: dialogFuncMapTypes = {
    displayResponsive: setDisplayResponsive,
  };

  interface dialogFuncMapTypes {
    [key: string]: Dispatch<SetStateAction<boolean>>;
  }

  const onClick = (name: string) => {
    dialogFuncMap[`${name}`](true);
  };

  const handleDeleteTodo = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todoId);
      setIsLoading(false);
      onHide("displayResponsive");
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const onHide = (name: string) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name: string) => {
    return (
      <div>
        <Button
          disabled={isLoading}
          label={isLoading ? "" : "Cancel"}
          icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-times"}
          onClick={() => onHide(name)}
          className="p-button-text"
        />
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card">
        <Button
          className={whoseTodo.name === "hers" ? "bg-pink-300" : "bg-blue-300"}
          icon="pi pi-delete-left"
          onClick={() => onClick("displayResponsive")}
        />
        <Dialog
          showHeader={isLoading ? false : true}
          header="Delete Todo"
          className={
            isLoading
              ? "w-full sm:w-[75vh] pt-10 text-primary-bg"
              : "w-full sm:w-[75vh]"
          }
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          footer={renderFooter("displayResponsive")}
        >
          <DeleteTodoForm
            todoId={todoId}
            handleDeleteTodo={handleDeleteTodo}
            isLoading={isLoading}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteTodo;