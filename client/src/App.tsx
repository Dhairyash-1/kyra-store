import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
