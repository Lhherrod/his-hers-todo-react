import { useState } from "react";

interface Props {
  onSetNewTaskWhoseTask: (
    newTaskDescription: string,
    newTaskWhoseTask: string,
    newTaskComplete: boolean
  ) => object;
}

export const AddTask = ({ onSetNewTaskWhoseTask }: Props) => {
  const [newTaskWhoseTask, setNewTaskWhoseTask] = useState("");
  const [newTaskComplete, setNewTaskComplete] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  return (
    <div className="grid gap-6 items-start md:grid-cols-3 grid-cols-1">
      <div className="bg-white p-3 shadow rounded-lg md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">Add Task</h2>

        <label htmlFor="description">What Task Is This?</label>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Task?..."
            className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="whoseTask">Whose Task is it?</label>
          <select
            name="whoseTask"
            id="whoseTask"
            className="w-full rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
            defaultValue={"-"}
            onChange={(e) => setNewTaskWhoseTask(e.target.value)}
          >
            <option disabled>-</option>
            <option value="hers">hers</option>
            <option value="his">his</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="complete">Is Task Completed?</label>
          <input
            type="checkbox"
            id="complete"
            className="ml-2 rounded border-orange-300 focus:border-orange-300 focus:ring-orange-300"
            checked={newTaskComplete}
            onChange={(e) => setNewTaskComplete(e.target.checked)}
          />
        </div>

        <button
          onClick={() =>
            onSetNewTaskWhoseTask(
              newTaskDescription,
              newTaskWhoseTask,
              newTaskComplete
            )
          }
          className="btn-primary w-full flex items-center justify-center mt-3 bg-purple-800 text-white py-2 px-3 rounded hover:bg-purple-600 active:bg-purple-700 transition-colors shadow-md shadow-[#103];"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};
export default AddTask;
