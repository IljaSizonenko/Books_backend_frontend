import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BooksPage from "./pages/BooksPage.js";
import BookDetailPage from "./pages/BookDetailPage.js";
import AddBookPage from "./pages/AddBookPage.js";
import EditBookPage from "./pages/EditBookPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from / to /books */}
        <Route path="/" element={<Navigate to="/books" replace />} />
        {/* Books list */}
        <Route path="/books" element={<BooksPage />} />
        {/* Create book */}
        <Route path="/books/create" element={<AddBookPage />} />
        {/* Book details */}
        <Route path="/books/:id" element={<BookDetailPage />} />
        {/* Edit book */}
        <Route path="/books/:id/edit" element={<EditBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;