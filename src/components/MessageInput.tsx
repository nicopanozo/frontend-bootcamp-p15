import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../store/chatSlice";
import { selectSelectedThreadId } from "../store/selectors";

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const selectedThreadId = useSelector(selectSelectedThreadId);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedThreadId) {
      dispatch(
        sendMessage({
          threadId: selectedThreadId,
          author: "You",
          content: message.trim(),
        }),
      );
      setMessage("");
    }
  };

  if (!selectedThreadId) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
