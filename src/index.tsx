import ReactDOM from "react-dom/client";
import AppComponent from "./components/app/App";
import "./index.css";

import "./style/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<AppComponent />);
