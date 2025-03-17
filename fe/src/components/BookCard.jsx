import React from "react";
import { Card, Button } from "react-bootstrap";

function BookCard({ book }) {
  return (
    <Card className="h-100 relative">
      <Card.Img variant="top" src={book.coverUrl} alt={book.title} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Card.Text>
          <small>{book.publisher}</small>
        </Card.Text>
        <Button
          variant={book.available_copies > 0 ? "success" : "danger"}
          disabled={book.available_copies === 0}
          className="absolute bottom-0 left-8"
        >
          {book.available_copies > 0 ? "Mượn sách" : "Hết sách"}
        </Button>
        <Button
          variant={book.available_copies > 0 ? "success" : "danger"}
          disabled={book.available_copies === 0}
          className="absolute bottom-0 left-8"
        >
           Đặt mượn
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
