export interface Thread {
  id: string;
  name: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  threadId: string;
  author: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface UserPresence {
  userId: string;
  username: string;
  isOnline: boolean;
  lastSeen: number;
}

export interface ChatState {
  threads: Thread[];
  messages: Record<string, Message[]>;
  selectedThreadId: string | null;
  userPresence: Record<string, UserPresence>;
}
