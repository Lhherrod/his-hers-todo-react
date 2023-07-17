import { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import AddTodoForm from "./AddTodoForm";
import { useCreateTodoMutation } from "../features/todos/todosSlice";
import { AddTodo } from "../interfaces/Todo";

interface Props {
  whoseTodo: string;
}

const Modal = ({ whoseTodo }: Props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [addTodo] = useCreateTodoMutation();
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

  const handleCreateTodo = async (data: AddTodo) => {
    setIsLoading(true);
    try {
      await addTodo(data);
      onHide("displayResponsive");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const onHide = async (name: string) => {
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
          label="Add Todo..."
          className={whoseTodo === "hers" ? "bg-pink-300" : "bg-blue-300"}
          icon="pi pi-plus-circle"
          onClick={() => onClick("displayResponsive")}
        />
        <Dialog
          showHeader={isLoading ? false : true}
          header="Add Todo"
          className={
            isLoading
              ? "w-full sm:w-[75vh] pt-10 text-primary-bg"
              : "w-full sm:w-[75vh]"
          }
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          footer={renderFooter("displayResponsive")}
        >
          <AddTodoForm
            handleCreateTodo={handleCreateTodo}
            isLoading={isLoading}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default Modal;