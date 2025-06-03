import type { RootState } from "./index";

export const selectThreads = (state: RootState) => state.chat.threads;
export const selectSelectedThreadId = (state: RootState) =>
  state.chat.selectedThreadId;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectUserPresence = (state: RootState) => state.chat.userPresence;

export const selectMessagesForThread =
  (threadId: string) => (state: RootState) =>
    state.chat.messages[threadId] || [];

export const selectSelectedThreadMessages = (state: RootState) => {
  const selectedThreadId = state.chat.selectedThreadId;
  return selectedThreadId ? state.chat.messages[selectedThreadId] || [] : [];
};
