import { NewTaskType } from "../types/tasks";
import { useState } from "react";
import Button from "../components/Button";

interface Props {
  onSelectHerTask: (task: NewTaskType) => void;
  onSelectHisTask: (task: NewTaskType) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, task: string) => void;
  tasks: NewTaskType[];
}

function ListTable({
  tasks,
  onSelectHerTask,
  onSelectHisTask,
  onDeleteTask,
  onUpdateTask,
}: Props) {
  const hisTasks: NewTaskType[] = [];
  const herTasks: NewTaskType[] = [];

  const [herSelectedTask, setHerSelectedTask] = useState(-1);
  const [HisSelectedTask, setHisSelectedTask] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState("");

  tasks.map((task) =>
    task.whoseTask === "his" ? hisTasks.push(task) : herTasks.push(task)
  );

  return (
    <>
      {herTasks.length && (
        <div>
          <h1 className="text-center text-purple-400 text-3xl md:text-5xl">
            Her Tasks
          </h1>
          <div className="container mx-auto w-full tasks-center justify-center">
            <ul className="flex flex-col bg-pink-300 p-4">
              {herTasks.map((task, index) => (
                <li
                  className={
                    herSelectedTask === index
                      ? "text-green-500"
                      : "text-red-500"
                  }
                  onClick={() => {
                    setHerSelectedTask(index);
                    onSelectHerTask(task);
                  }}
                  key={index}
                >
                  <div className="select-none bg-gray-200 rounded-md flex flex-1 tasks-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-4">
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center tasks-center mr-4">
                      ⚽️
                    </div>
                    <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium">{task.description}</div>
                      <div className="text-gray-600 text-sm">200ml</div>
                    </div>
                    <div className="text-gray-600 text-xs">
                      6:00 AM
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => onDeleteTask(task.id!)}
                      >
                        delete task
                      </button>
                      <div>
                        <label htmlFor="update-task">Update Task</label>
                        <input
                          id="update-task"
                          className="text-indigo-500"
                          onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                        <button
                          onClick={() => onUpdateTask(task.id!, updatedTask)}
                        >
                          Update Task
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button />
          </div>
        </div>
      )}
      {hisTasks.length && (
        <div>
          <h1 className="text-center text-indigo-800 text-3xl md:text-5xl">
            His Tasks
          </h1>
          <div className="container mx-auto w-full tasks-center justify-center">
            <ul className="flex flex-col bg-blue-300 p-4">
              {hisTasks.map((task, index) => (
                <li
                  className={
                    HisSelectedTask === index
                      ? "text-green-500"
                      : "text-red-500"
                  }
                  onClick={() => {
                    setHisSelectedTask(index);
                    onSelectHisTask(task);
                  }}
                  key={index}
                >
                  <div className="select-none bg-gray-200 rounded-md flex flex-1 tasks-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-4">
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center tasks-center mr-4">
                      ⚽️
                    </div>
                    <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium">{task.description}</div>
                      <div className="text-gray-600 text-sm">200ml</div>
                    </div>
                    <div className="text-gray-600 text-xs">
                      6:00 AM
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => onDeleteTask(task.id!)}
                      >
                        delete task
                      </button>
                      <div>
                        <label htmlFor="update-task">Update Task</label>
                        <input
                          id="update-task"
                          className="text-indigo-500"
                          onChange={(e) => setUpdatedTask(e.target.value)}
                        />
                        <button
                          className="mr-2"
                          onClick={() => onUpdateTask(task.id!, updatedTask)}
                        >
                          Update Task
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button />
          </div>
        </div>
      )}

      {/* haven't decided where to put this yet */}
      {/* <div className="mx-auto w-2/5">
        <input
          className="mr-6"
          type="text"
          placeholder="Search Tasks By Name"
        />
        <input type="text" placeholder="Search Tasks By Date" />
      </div>
     */}
    </>
  );
}

export default ListTable;
