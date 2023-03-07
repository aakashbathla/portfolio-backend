import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Rgister/Register";
import Login from "./pages/Login/Login";
import Write from "./pages/Write/Write";
import Home from "./pages/Home/Home";
import Single from "./pages/Single/Single";
import Navbar from "./components/Navbar/Navbar";
import Tags from "./components/Tags/Tags";
import "./App.css";
import User from "./pages/User/User";
const Layout = ({ children }: any) => {
  return (
    <>
      <div className="app-container">
        <div className="app-book">
          <Navbar />
          <Tags />
          {children}
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout children={<Home />} />} />
          <Route path="/post/:id" element={<Layout children={<Single />} />} />
          <Route path="/write" element={<Layout children={<Write />} />} />
          <Route path="/user/:id" element={<Layout children={<User />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
