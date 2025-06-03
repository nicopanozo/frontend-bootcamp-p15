import React from "react";
import { useSelector } from "react-redux";
import { selectUserPresence } from "../store/selectors";
import type { UserPresence as UserPresenceType } from "../types";

const UserPresence: React.FC = () => {
  const userPresence = useSelector(selectUserPresence);

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Users</h3>
      <div className="space-y-3">
        {Object.values(userPresence).map((user: UserPresenceType) => (
          <div key={user.userId} className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">
                {user.username}
              </span>
              <div className="text-xs text-gray-500">
                {user.isOnline
                  ? "Online"
                  : `Last seen: ${new Date(user.lastSeen).toLocaleTimeString()}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPresence;
