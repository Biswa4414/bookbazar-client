import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EntryPage from "./pages/EntryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/books/EntryPage" />} />
        <Route path="/books/register" element={<Register />} />
        <Route path="/books/login" element={<Login />} />
        <Route path="/books/entryPage" element={<EntryPage />} />
        <Route path="/books" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />q
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
