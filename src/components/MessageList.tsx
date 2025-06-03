import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedThreadMessages,
  selectSelectedThreadId,
} from "../store/selectors";
import { editMessage, deleteMessage } from "../store/chatSlice";

const MessageList: React.FC = () => {
  const messages = useSelector(selectSelectedThreadMessages);
  const selectedThreadId = useSelector(selectSelectedThreadId);
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEditStart = (messageId: string, currentContent: string) => {
    setEditingMessageId(messageId);
    setEditContent(currentContent);
  };

  const handleEditSave = (messageId: string) => {
    if (editContent.trim()) {
      dispatch(editMessage({ messageId, content: editContent.trim() }));
    }
    setEditingMessageId(null);
    setEditContent("");
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
    setEditContent("");
  };

  const handleDelete = (messageId: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteMessage(messageId));
    }
  };

  if (!selectedThreadId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a thread to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            No messages yet. Start the conversation!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.author === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg group relative ${
                  message.author === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <div className="text-sm font-medium mb-1">{message.author}</div>

                {editingMessageId === message.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-2 py-1 text-sm text-black border rounded"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleEditSave(message.id)
                      }
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditSave(message.id)}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </>
                )}

                {message.author === "You" &&
                  editingMessageId !== message.id && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button
                          onClick={() =>
                            handleEditStart(message.id, message.content)
                          }
                          className="p-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
