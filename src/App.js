
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Reports from "./Pages/Reports";
import Header from "./Components/Shared/Header";
import Settings from "./Pages/Settings";
import { useStepsContext } from "./Context/StateContext";
import { useEffect } from "react";
import Login from "./Components/Shared/Login";

function App() {

    const {openLoginModal, setOpenLoginModal}  = useStepsContext()

  useEffect(() => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    setOpenLoginModal(!openLoginModal)
  }
}, []);

  return (
    <div className="App">
        {openLoginModal && <Login />}
      <Header />
       <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Reports />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
