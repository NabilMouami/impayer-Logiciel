import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Impayer from "./Impayer";
import { Changer } from "./Changer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        limit={1}
        toastStyle={{ backgroundColor: "crimson" }}
      />

      <Routes>
        <Route path="/" element={<Impayer />} />
        <Route path="/changer" element={<Changer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
