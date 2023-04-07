import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import { Route, Routes } from "react-router-dom";
import Protected from "./Component/Protected";
import Info from "./Component/Info";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Payment from "./Component/Payment";
import BookingInfo from "./Component/BookingInfo";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/bookingInfo" element={<BookingInfo />} />

          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
