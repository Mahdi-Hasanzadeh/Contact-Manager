import { useParams } from "react-router-dom";
import { BooksData } from "./BooksData.js";

const ViewBook = () => {
  const params = useParams();

  const book = BooksData.filter(
    (book) => parseInt(book.id) === parseInt(params.bookId)
  );

  return (
    <div>
      <h3>View Book: {book[0].name ? book[0].name : "none"}</h3>
    </div>
  );
};

export default ViewBook;
