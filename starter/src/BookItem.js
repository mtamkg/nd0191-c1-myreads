import { EType } from "./core/enum";
import * as BooksApi from "./BooksAPI";

export const BookItem = (props) => {
  const book = props.book;
  function updateType(e) {
    const bookTemp = e.split(",");
    if (bookTemp?.length < 2) return;

    const bookId = bookTemp[0];
    const typeUpdate = bookTemp[1];
    BooksApi.update(bookId, typeUpdate).then((res) => {
      if (!res) return;
      props.updateList();
    });
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: 'url("' + book?.imageLinks?.thumbnail + '")',
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => updateType(e.target.value)}
              defaultValue={book.id + "," + book.shelf ?? "none"}
            >
              <option value="none" disabled>
                {" "}
                Move to...
              </option>
              <option value={[book.id, EType.READING]}>
                {" "}
                Currently Reading{" "}
              </option>
              <option value={[book.id, EType.WANT_TO_READ]}>
                {" "}
                Want To Read{" "}
              </option>
              <option value={[book.id, EType.READ]}> Read </option>
              <option value={[book.id, EType.NONE]}> None </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.toString()}</div>
      </div>
    </li>
  );
};
export default BookItem;
