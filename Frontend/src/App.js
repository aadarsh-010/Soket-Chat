
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './App.css';
import Home from "./pages/home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  
  
  return (
    <>
      <div className="dark">
      <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? <Home  /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      
    </div>
    </>
  );
}

export default App;
