import { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { UpdateTodo as UpdateTodoInterface } from "../interfaces/Todo";
import UpdateTodoForm from "./UpdateTodoForm";
import { useUpdateTodoMutation } from "../features/todos/todosSlice";

interface Props {
  todo: UpdateTodoInterface;
}

const UpdateTodo = ({ todo }: Props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [updateTodo] = useUpdateTodoMutation();
  const [isLoading, setIsLoading] = useState(false);

  const dialogFuncMap: dialogFuncMapTypes = {
    displayResponsive: setDisplayResponsive,
  };

  interface dialogFuncMapTypes {
    [key: string]: Dispatch<SetStateAction<boolean>>;
  }

  const handleUpdateTodo = async (data: UpdateTodoInterface) => {
    setIsLoading(true);
    try {
      await updateTodo(data);
      setIsLoading(false);
      onHide("displayResponsive");
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const onClick = (name: string) => {
    dialogFuncMap[`${name}`](true);
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
          className={
            todo.whoseTodo.name === "hers" ? "bg-pink-300" : "bg-blue-300"
          }
          icon="pi pi-file-edit"
          onClick={() => onClick("displayResponsive")}
        />
        <Dialog
          showHeader={isLoading ? false : true}
          header="Update Todo"
          className={
            isLoading
              ? "w-full sm:w-[75vh] pt-10 text-primary-bg"
              : "w-full sm:w-[75vh]"
          }
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          footer={renderFooter("displayResponsive")}
        >
          <UpdateTodoForm
            todo={todo}
            handleUpdateTodo={handleUpdateTodo}
            isLoading={isLoading}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default UpdateTodo;