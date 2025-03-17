import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:9000/book');
        console.log(response);
        setBooks(response.data);
      } catch (err) {
        setError('Không thể tải danh sách sách');
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     <Row className="g-4">
        {books.map((book) => (
          <Col key={book.id} md={4}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BookList;
