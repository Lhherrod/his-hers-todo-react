import { useState, useEffect } from "react";
import { db, auth, storage } from "./config/firebase";
import { NewTaskType } from "./types/tasks";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Auth from "./components/Auth";
import ListTable from "./components/ListTable";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [tasks, setTasks] = useState<NewTaskType[]>([]);
  const tasksCollection = collection(db, "tasks");

  const handleHerSelectedTask = (task: NewTaskType) => {
    console.log(task);
  };
  const handleHisSelectedTask = (task: NewTaskType) => {
    console.log(task);
  };
  const handleDeleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    getTasks();
  };
  const handleUpdateTask = async (id: string, task: string) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { description: task });
    getTasks();
  };

  const getTasks = async () => {
    try {
      const data = await getDocs(tasksCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async () => {
    try {
      await addDoc(tasksCollection, {
        description: newTaskDescription,
        whoseTask: newTaskWhoseTask,
        complete: newTaskComplete,
        createdAt: new Date(),
        userId: auth.currentUser?.uid,
      });

      [getTasks()];
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  };

  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskWhoseTask, setNewTaskWhoseTask] = useState("");
  const [newTaskComplete, setNewTaskComplete] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <Auth />
      <div>
        <label htmlFor="description">What Task Is This?</label>
        <input
          type="text"
          id="description"
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />

        <label htmlFor="whoseTask">Whose Task is it?</label>
        <select
          name="whoseTask"
          id="whoseTask"
          defaultValue={"-"}
          onChange={(e) => setNewTaskWhoseTask(e.target.value)}
        >
          <option disabled>-</option>
          <option value="hers">hers</option>
          <option value="his">his</option>
        </select>

        <label htmlFor="complete">Is Task Completed?</label>
        <input
          type="checkbox"
          id="complete"
          checked={newTaskComplete}
          onChange={(e) => setNewTaskComplete(e.target.checked)}
        />

        <button onClick={onSubmit}>Add Task</button>
      </div>
      <ListTable
        tasks={tasks}
        onSelectHerTask={handleHerSelectedTask}
        onSelectHisTask={handleHisSelectedTask}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />

      <div>
        <label htmlFor="file-upload"></label>
        <input
          type="file"
          id="file-upload"
          onChange={(e) => setFileUpload(e.target.files?.[0] || null)}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
