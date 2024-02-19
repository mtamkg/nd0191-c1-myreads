import * as BooksApi from "./BooksAPI";
import { useEffect, useState } from "react";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";
import { EType } from "./core/enum";

export const BookList = () => {
  // list stage
  const [books, setBookList] = useState([]);
  async function getBookList() {
    const res = await BooksApi.getAll();
    if (res) {
      setBookList(res);
    }
  }

  useEffect(() => {
    getBookList().then();
  }, []);

  const listType = [
    { label: "Currently Reading", enum: EType.READING },
    { label: "Want to Read", enum: EType.WANT_TO_READ },
    { label: "Read", enum: EType.READ },
  ];

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {listType.map((d) => (
              <div className="bookshelf" key={d.label}>
                <h2 className="bookshelf-title">{d.label}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books?.length > 0
                      ? books
                          .filter((book) => book.shelf === d.enum)
                          ?.map((book, index) => (
                            <BookItem
                              book={book}
                              key={index}
                              updateList={() => getBookList()}
                            />
                          ))
                      : null}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};
export default BookList;
