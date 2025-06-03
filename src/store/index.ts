import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import type { ChatState } from "../types";
import { loadState, saveState } from "../utils/localStorage";

const persistedChatState = loadState();

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  preloadedState: persistedChatState
    ? { chat: persistedChatState as ChatState }
    : undefined,
});

store.subscribe(() => {
  saveState(store.getState().chat);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
