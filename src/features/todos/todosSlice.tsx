import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
  getDocs,
} from 'firebase/firestore';
import { firestoreApi } from '../../app/firestoreApi';
import { Todos } from '../../types/todos';
import { db } from "../../config/firebase";

export const todosApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todos[], void>({
      async queryFn() {
        try {
          const ref = collection(db, "tasks");
          const querySnapshot = await getDocs(ref);
          let Todos: Todos[] = [];
          querySnapshot?.forEach((doc) => {
            Todos.push({ id: doc.id, ...doc.data() } as Todos);
          });
          return { data: Todos };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Todos'],
    }),
  }),
});

export const {
  useFetchTodosQuery,
} = todosApi;
