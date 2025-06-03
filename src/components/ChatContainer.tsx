import React from "react";
import ThreadList from "./ThreadList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import UserPresence from "./UserPresence";

const ChatContainer: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ThreadList />
      <div className="flex-1 flex flex-col">
        <MessageList />
        <MessageInput />
      </div>
      <UserPresence />
    </div>
  );
};

export default ChatContainer;
