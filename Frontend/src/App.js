
import { useSelector } from "react-redux";
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

  const { user } = useSelector((state) => state.user);
  console.log(user);
  
  return (
    <>
      <div className="dark">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home  />}
            />
            <Route
              exact
              path="/login"
              element={ <Login /> }
            />
            <Route
              exact
              path="/register"
              element={ <Register /> }
            />
          </Routes>
        </Router>
      
    </div>
    </>
  );
}

export default App;
