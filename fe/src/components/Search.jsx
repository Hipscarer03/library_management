import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export function Search() {
  const [searchType, setSearchType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const books = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publisher: "J. B. Lippincott & Co.",
      coverUrl: "https://via.placeholder.com/150x200",
      available: true,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      coverUrl: "https://via.placeholder.com/150x200",
      available: false,
    },
  ];

  const libraryRules = [
    "Mượn sách tối đa 3 cuốn một lần",
    "Thời gian mượn tối đa 14 ngày",
    "Phạt 5.000đ/ngày nếu trả sách trễ hạn",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchQuery} in ${searchType}`);
  };

  return (
    <Container className="py-4">
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2">
          <Col md={3}>
            <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="title">Tên sách</option>
              <option value="author">Tác giả</option>
              <option value="publishher">Nhà xuất bản</option>
              <option value="isbn">Mã sách quốc tế ISBN</option>
            </Form.Select>
          </Col>
          <Col md={7}>
            <Form.Control
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">Tìm kiếm</Button>
          </Col>
        </Row>
      </Form>

      {/* <Row>
        <Col lg={9} className="mb-4">
          <h2 className="mb-3">Danh sách sách</h2>
          <Row className="g-4">
            {books.map((book) => (
              <Col key={book.id} md={4}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={3}>
          <Card>
            <Card.Body>
              <Card.Title>Nội quy thư viện</Card.Title>
              <ul>
                {libraryRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
}

