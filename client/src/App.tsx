import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import Header from "./components/Header";

const App = () => {
  const context = useContext(AppContext);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {context?.isLoggedIn && (
            <>
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopping-cart" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
