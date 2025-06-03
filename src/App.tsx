import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ChatContainer from "./components/ChatContainer";
import { startMessageSimulation } from "./utils/messageSimulator";

function App() {
  useEffect(() => {
    startMessageSimulation();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <ChatContainer />
      </div>
    </Provider>
  );
}

export default App;
