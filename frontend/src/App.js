import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { Navigation } from "./components/shared/Navigation/Navigation";
import { Register } from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Authentication from "./pages/Auth/Authentication";
import Activate from "./pages/Activate/Activate";
import userEvent from "@testing-library/user-event";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import GuestRoute from "./Routes/GuestRoute/GuestRoute";
import SemiProtected from "./Routes/SemiProtected/SemiProtected";
import ProctectedRoute from "./Routes/ProtectedRoute/ProctectedRoute";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isActivated } = useSelector((state) => state.activate);

  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/auth"
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Authentication />
            </GuestRoute>
          }
        />

        <Route
          path="/activate"
          element={
            <SemiProtected
              isAuthenticated={isAuthenticated}
              isActivated={isActivated}
            >
              <Activate />
            </SemiProtected>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProctectedRoute
              isAuthenticated={isAuthenticated}
              isActivated={isActivated}
            >
              <Rooms />
            </ProctectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
