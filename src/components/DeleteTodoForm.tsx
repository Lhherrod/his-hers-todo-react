import { Button } from "primereact/button";

interface Props {
  todoId: string;
  isLoading: boolean;
  handleDeleteTodo: Function;
}

const DeleteTodoForm = ({ todoId, isLoading, handleDeleteTodo }: Props) => {
  const onSubmit = async () => {
    try {
      await handleDeleteTodo(todoId);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <p>Are you sure that you want to delete your todo?</p>
      <Button
        onClick={onSubmit}
        disabled={isLoading}
        type="submit"
        label={isLoading ? "" : "Delete Todo"}
        className="mt-2 text-primary"
      >
        {isLoading && (
          <span className="p-input-icon-right p-input-icon-left text-primary">
            please wait...
            <i className="pi pi-spin pi-spinner" />
            <span className="p-input-icon-right p-input-icon-left"></span>
          </span>
        )}
      </Button>
    </>
  );
};

export default DeleteTodoForm;