import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import EnterOtp from "./Pages/EnterOtp";
import OtpSuccessModal from "./components/OtpSuccessModal";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
