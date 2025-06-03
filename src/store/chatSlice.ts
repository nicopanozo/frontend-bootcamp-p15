import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChatState, Message } from "../types";

const initialState: ChatState = {
  threads: [
    { id: "1", name: "General", unreadCount: 0 },
    { id: "2", name: "Random", unreadCount: 0 },
    { id: "3", name: "Help", unreadCount: 0 },
  ],
  messages: {
    "1": [
      {
        id: "1",
        threadId: "1",
        author: "System",
        content: "Welcome to General chat!",
        timestamp: Date.now() - 1000000,
        read: true,
      },
    ],
    "2": [],
    "3": [],
  },
  selectedThreadId: null,
  userPresence: {
    Alice: {
      userId: "Alice",
      username: "Alice",
      isOnline: true,
      lastSeen: Date.now(),
    },
    Bob: {
      userId: "Bob",
      username: "Bob",
      isOnline: false,
      lastSeen: Date.now() - 300000,
    },
    Charlie: {
      userId: "Charlie",
      username: "Charlie",
      isOnline: true,
      lastSeen: Date.now(),
    },
    Diana: {
      userId: "Diana",
      username: "Diana",
      isOnline: false,
      lastSeen: Date.now() - 600000,
    },
    Eve: {
      userId: "Eve",
      username: "Eve",
      isOnline: true,
      lastSeen: Date.now(),
    },
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectThread: (state, action: PayloadAction<string>) => {
      state.selectedThreadId = action.payload;
      // Mark all messages in the selected thread as read
      if (state.messages[action.payload]) {
        state.messages[action.payload].forEach((message) => {
          message.read = true;
        });
      }
      // Reset unread count for the selected thread
      const thread = state.threads.find((t) => t.id === action.payload);
      if (thread) {
        thread.unreadCount = 0;
      }
    },

    sendMessage: (
      state,
      action: PayloadAction<{
        threadId: string;
        author: string;
        content: string;
      }>,
    ) => {
      const { threadId, author, content } = action.payload;
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        threadId,
        author,
        content,
        timestamp: Date.now(),
        read: true, // Messages sent by the user are automatically read
      };

      if (!state.messages[threadId]) {
        state.messages[threadId] = [];
      }
      state.messages[threadId].push(newMessage);
    },

    receiveMessage: (
      state,
      action: PayloadAction<{
        threadId: string;
        author: string;
        content: string;
      }>,
    ) => {
      const { threadId, author, content } = action.payload;
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        threadId,
        author,
        content,
        timestamp: Date.now(),
        read: state.selectedThreadId === threadId, // Only read if the thread is currently selected
      };

      if (!state.messages[threadId]) {
        state.messages[threadId] = [];
      }
      state.messages[threadId].push(newMessage);

      // Increment unread count if the thread is not currently selected
      if (state.selectedThreadId !== threadId) {
        const thread = state.threads.find((t) => t.id === threadId);
        if (thread) {
          thread.unreadCount += 1;
        }
      }
    },

    markThreadAsRead: (state, action: PayloadAction<string>) => {
      const threadId = action.payload;
      if (state.messages[threadId]) {
        state.messages[threadId].forEach((message) => {
          message.read = true;
        });
      }
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        thread.unreadCount = 0;
      }
    },

    editMessage: (
      state,
      action: PayloadAction<{ messageId: string; content: string }>,
    ) => {
      const { messageId, content } = action.payload;
      for (const threadId in state.messages) {
        const message = state.messages[threadId].find(
          (m) => m.id === messageId,
        );
        if (message) {
          message.content = content;
          message.timestamp = Date.now(); // Update timestamp for edited message
          break;
        }
      }
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      for (const threadId in state.messages) {
        const messageIndex = state.messages[threadId].findIndex(
          (m) => m.id === messageId,
        );
        if (messageIndex !== -1) {
          state.messages[threadId].splice(messageIndex, 1);
          break;
        }
      }
    },

    updateUserPresence: (
      state,
      action: PayloadAction<{ userId: string; isOnline: boolean }>,
    ) => {
      const { userId, isOnline } = action.payload;
      if (state.userPresence[userId]) {
        state.userPresence[userId].isOnline = isOnline;
        state.userPresence[userId].lastSeen = Date.now();
      }
    },
  },
});

export const {
  selectThread,
  sendMessage,
  receiveMessage,
  markThreadAsRead,
  editMessage,
  deleteMessage,
  updateUserPresence,
} = chatSlice.actions;
export default chatSlice.reducer;
