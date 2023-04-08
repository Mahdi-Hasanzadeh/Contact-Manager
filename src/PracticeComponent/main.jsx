import React from "react";
import Navbar from "./Navbar.jsx";
import Books from "./Books.jsx";
import ViewBook from "./ViewBook.jsx";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { BooksData } from "./BooksData.js";

const Main = () => {
  const [books, setbooks] = React.useState(BooksData);
  const [searchParams] = useSearchParams();
  //console.log(searchParams.get("filter"));
  const navigate = useNavigate();
  const location = useLocation();

  const filterBooks = books.filter((book) => {
    let searchString = searchParams.get("filter");
    if (!searchString) return book;
    return book.name.toLowerCase().includes(searchString.toLocaleLowerCase());
  });

  const deleteBook = (number) => {
    setbooks((prevData) => prevData.filter((book) => book.id !== number));
    navigate("/books" + location.search);
  };

  const addBook = (name, price) => {
    let newBook = {
      name: name,
      price: price,
      id: books.length,
    };
    setbooks((prevData) => {
      return [...prevData, newBook];
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            path="/books"
            element={
              <Books
                books={filterBooks}
                onDelete={deleteBook}
                addBook={addBook}
              />
            }
          />
          <Route path="/books/:bookId" element={<ViewBook />} />
          <Route path="*" element={<div>404 Page not Found</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default Main;
