import { configureStore } from "@reduxjs/toolkit";
import { firestoreApi } from "./firestoreApi";
import authSlice from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
("../features/todos/todosSlice");

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(firestoreApi.middleware);
  },
});

setupListeners(store.dispatch);

// our store above will keep up or track both of these exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;