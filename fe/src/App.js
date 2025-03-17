import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import SearchBook from "./pages/main/SearchBook";
import BorrowingBook from "./pages/main/BorrowingBook";
import History from "./pages/main/History";
import ReserveBook from "./pages/main/ReserveBook";
import SuggestBook from "./pages/main/SuggestBook.jsx";
import Profile from "./pages/main/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./pages/admin/HomeAdmin";
import BookManagement from "./pages/admin/BookManagement";
import UserManagement from "./pages/admin/UserManagement";
import BorrowingManagement from "./pages/admin/BorrowingManagement";
import RequestManagement from "./pages/admin/RequestManagement";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBook />} />
          <Route path="/borrowing-book" element={<BorrowingBook />} />
          <Route path="/history" element={<History />} />
          <Route path="/reserve" element={<ReserveBook />} />
          <Route path="/suggest" element={<SuggestBook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/book" element={<BookManagement />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/borrow" element={<BorrowingManagement />} />
          <Route path="/admin/request" element={<RequestManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
