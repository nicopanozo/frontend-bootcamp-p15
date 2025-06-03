import { store } from "../store";
import { receiveMessage, updateUserPresence } from "../store/chatSlice";

const sampleMessages = [
  "Hello everyone!",
  "How is everyone doing?",
  "Anyone working on something interesting?",
  "Good morning!",
  "Thanks for the help!",
  "See you later!",
  "What do you think about this?",
  "Great idea!",
  "I agree with that",
  "Let me know if you need help",
];

const sampleAuthors = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

export const startMessageSimulation = () => {

  const simulatePresenceChange = () => {
    const randomAuthor =
      sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)];
    const randomStatus = Math.random() > 0.7;

    store.dispatch(
      updateUserPresence({
        userId: randomAuthor,
        isOnline: randomStatus,
      }),
    );

    const nextPresenceInterval = Math.random() * 30000 + 30000;
    setTimeout(simulatePresenceChange, nextPresenceInterval);
  };

  const simulateMessage = () => {
    const state = store.getState();
    const threads = state.chat.threads;
    const onlineUsers = Object.values(state.chat.userPresence).filter(
      (user) => user.isOnline,
    );

    if (threads.length > 0 && onlineUsers.length > 0) {
      const randomThread = threads[Math.floor(Math.random() * threads.length)];
      const randomUser =
        onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
      const randomMessage =
        sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

      store.dispatch(
        receiveMessage({
          threadId: randomThread.id,
          author: randomUser.username,
          content: randomMessage,
        }),
      );
    }

    const nextInterval = Math.random() * 5000 + 5000;
    setTimeout(simulateMessage, nextInterval);
  };

  setTimeout(simulatePresenceChange, 2000);

  setTimeout(simulateMessage, 3000);
};
