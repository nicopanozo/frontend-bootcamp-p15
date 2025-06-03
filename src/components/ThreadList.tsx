import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectThread } from "../store/chatSlice";
import { selectThreads, selectSelectedThreadId } from "../store/selectors";

const ThreadList: React.FC = () => {
  const threads = useSelector(selectThreads);
  const selectedThreadId = useSelector(selectSelectedThreadId);
  const dispatch = useDispatch();

  const handleThreadSelect = (threadId: string) => {
    dispatch(selectThread(threadId));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Threads</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => handleThreadSelect(thread.id)}
            className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
              selectedThreadId === thread.id
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{thread.name}</span>
              {thread.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {thread.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadList;
