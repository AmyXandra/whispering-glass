import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Loading } from "./page/Loading";
import Game from "./page/Game";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "./index.css";
import BackgroundMusic from "./components/BackgroundMusic";

const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById("root"));

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second loading screen
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BackgroundMusic />
      <Provider store={store}>
        <div className="w-full h-full">
          <div id="toast-container"></div>
          <Game />
        </div>
      </Provider>
    </div>
  );
};

root.render(<Main />);
