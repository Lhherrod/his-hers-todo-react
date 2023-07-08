import { useState, useEffect } from "react";
import { db, auth, storage } from "./config/firebase";
import { NewTaskType } from "./types/tasks";
import { AddTask } from "./components/AddTask";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";
import Auth from "./components/Auth";
import ListTable from "./components/ListTable";

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

  const handleIsLoggedIn = () => {
    console.log(isLoggedIn);
    isLoggedIn ? setIsLoggedIn(false) : setIsLoggedIn(true);
    console.log(isLoggedIn);
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

  const handleNewTaskWhoseTask = async (
    newTaskDescription: string,
    newTaskWhoseTask: string,
    newTaskComplete: boolean
  ) => {
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

  const logOut = async () => {
    try {
      await signOut(auth);
      handleIsLoggedIn();
    } catch (error) {
      console.error(error);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  useEffect(() => {
    getTasks();
    // persist loggedIn user hack until I get busy with Redux or some store
    setTimeout(() => {
      auth?.currentUser?.email && setIsLoggedIn(true);
    }, 200);
  }, []);

  return (
    <div className="container lg:w-2/3 mx-auto py-5">
      {!isLoggedIn ? (
        <Auth onLoggedIn={handleIsLoggedIn} />
      ) : (
        <div>
          <ListTable
            tasks={tasks}
            onSelectHerTask={handleHerSelectedTask}
            onSelectHisTask={handleHisSelectedTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
          <AddTask onSetNewTaskWhoseTask={handleNewTaskWhoseTask} />
          <button onClick={logOut} className="text-2xl text-indigo-700">
            Logout
          </button>
          {/* will decide were to place this later */}
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
      )}
    </div>
  );
}

export default App;
