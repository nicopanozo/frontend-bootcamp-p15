# Chat Application with Message Threads

A Redux-powered React chat application that supports multiple message threads, real-time message simulation, and user presence tracking.

## 🚀 Features

### Core Features
- **Multiple Chat Threads**: Navigate between different conversation channels
- **Real-time Message Simulation**: Automatic incoming messages from simulated users every 5-10 seconds
- **Unread Message Tracking**: Visual indicators for unread messages per thread
- **Message Management**: Send, edit, and delete messages
- **User Presence**: Online/offline status simulation for chat participants
- **Data Persistence**: Chat history saved to localStorage

### Technical Features
- Built with React 19 + TypeScript
- State management with Redux Toolkit
- Styled with Tailwind CSS
- Real-time updates simulation
- Responsive design

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit, React-Redux
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## 📋 Requirements Fulfilled

- ✅ React and Redux Toolkit implementation
- ✅ Thread management (id, name, unreadCount)
- ✅ Message system (id, threadId, author, content, timestamp, read)
- ✅ Thread selection and message display
- ✅ Message sending functionality
- ✅ Simulated incoming messages (5-10 second intervals)
- ✅ Unread message counting
- ✅ Mark messages as read on thread view
- ✅ Redux selectors for derived data
- ✅ **Bonus**: Message editing and deletion
- ✅ **Bonus**: User presence simulation
- ✅ **Bonus**: localStorage persistence

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ChatContainer.tsx # Main chat layout
│   ├── ThreadList.tsx    # Thread sidebar
│   ├── MessageList.tsx   # Message display area
│   ├── MessageInput.tsx  # Message input form
│   └── UserPresence.tsx  # User status sidebar
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   ├── chatSlice.ts     # Main chat reducer
│   └── selectors.ts     # Redux selectors
├── types/               # TypeScript interfaces
│   └── index.ts         # Type definitions
└── utils/               # Utility functions
    ├── localStorage.ts  # Persistence helpers
    └── messageSimulator.ts # Message simulation
```

## 🎮 Usage

1. **Select a Thread**: Click on any thread in the left sidebar to start chatting
2. **Send Messages**: Type in the input field and press Enter or click Send
3. **Edit Messages**: Hover over your messages and click the edit icon (✏️)
4. **Delete Messages**: Hover over your messages and click the delete icon (🗑️)
5. **Monitor Activity**: Watch for incoming messages and user status changes
6. **Unread Indicators**: Red badges show unread message counts per thread

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🏗️ Redux State Structure

```typescript
{
  threads: [
    { id: string, name: string, unreadCount: number }
  ],
  messages: {
    [threadId]: [
      { 
        id: string, 
        threadId: string, 
        author: string, 
        content: string, 
        timestamp: number, 
        read: boolean 
      }
    ]
  },
  selectedThreadId: string | null,
  userPresence: {
    [userId]: {
      userId: string,
      username: string,
      isOnline: boolean,
      lastSeen: number
    }
  }
}
```

## 📡 Redux Actions

- `selectThread(threadId)` - Switch to a different thread
- `sendMessage({ threadId, author, content })` - Send a new message
- `receiveMessage({ threadId, author, content })` - Handle incoming messages
- `markThreadAsRead(threadId)` - Mark all messages in thread as read
- `editMessage({ messageId, content })` - Edit an existing message
- `deleteMessage(messageId)` - Remove a message
- `updateUserPresence({ userId, isOnline })` - Update user online status

## 🎨 Styling

The application uses Tailwind CSS for styling with a clean, modern interface:
- **Light theme** with blue accents
- **Responsive design** that works on all screen sizes
- **Hover effects** and smooth transitions
- **Status indicators** for online/offline users
- **Message bubbles** with different styles for sent/received messages

## 🔄 Real-time Simulation

The app simulates a real chat environment:
- **Random messages** appear every 5-10 seconds
- **User presence** changes every 30-60 seconds
- **Messages** only come from currently online users
- **Unread counts** update automatically for inactive threads

## 💾 Data Persistence

Chat history and user data persist between sessions using localStorage:
- **Messages** are saved automatically
- **Thread states** are preserved
- **User presence** information is maintained
- **Selected thread** is remembered

## 🚀 Future Enhancements

Potential improvements for the application:
- Real WebSocket connections
- User authentication
- File/image sharing
- Message search functionality
- Dark mode theme
- Message reactions/emojis
- Typing indicators
- Message threading/replies

## 📝 License

This project is created for educational purposes as part of a Redux learning exercise.