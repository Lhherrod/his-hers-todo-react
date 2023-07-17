import {
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestoreApi } from "../../app/firestoreApi";
import { db } from "../../config/firebase";
import { AddTodo, UpdateTodo as UpdateTodoInterface, ReadTodo } from "../../interfaces/Todo";

export const todosApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodos: builder.query<ReadTodo[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "tasks");
          const querySnapshot = await getDocs(ref);
          let todos: ReadTodo[] = [];
          querySnapshot?.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() } as ReadTodo);
          });
          return { data: todos };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Todos"],
    }),
    createTodo: builder.mutation({
      // bypass baseQuery as we are using firebase sdk which fires off our CRUD under the hood
      async queryFn(data: AddTodo) {
        try {
          const ref = collection(db, "tasks");
          await addDoc(ref, {
            ...data,
          });
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      async queryFn(data: UpdateTodoInterface) {
        try {
          const todoDoc = doc(db, "tasks", data.id);
          await updateDoc(todoDoc, {
            ...data,
          });
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      async queryFn(data: string) {
        try {
          const todoDoc = doc(db, "tasks", data);
          await deleteDoc(todoDoc);
        } catch (error: any) {
          console.log(error.message);
          return { error: error.message };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;