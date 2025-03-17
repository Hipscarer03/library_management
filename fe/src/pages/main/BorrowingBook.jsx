import React, { useState, useEffect } from "react";
import { Card, Form, Button , Spinner, Modal, Alert, Table} from "react-bootstrap";
import { Header } from "../../components/Header";
import axios from "axios";

function BorrowingBook() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  localStorage.setItem("userId", "67d00a79c1188023eca5d293");
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`http://localhost:9000/borrowInfo/${userId}`)
        .then((response) => setBorrowedBooks(response.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
        
    } else {
      setError("No user ID found in localStorage");
      setLoading(false);
    }
  }, []);

  const calculateDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  console.log(formatDate ("2023-11-12T14:30:00+07:00"))
  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  const handleExtend = () => {  
  }

  return (
    <div>
      <Header />
      <Card className="w-full overflow-auto p-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên sách</th>
              <th>ISBN</th>
              <th>Ngày mượn</th>
              <th>Ngày hạn trả</th>
              <th>Số lần gia hạn còn lại</th>
              <th>Số ngày quá hạn</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book, index) => {
              const daysOverdue = calculateDaysOverdue(book.dueDate);
              const isOverdue = daysOverdue > 0;

              return (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={`Cover of ${book.title}`}
                      className="h-100 w-100 object-cover rounded shadow-sm"
                      style={{ width: "60px", height: "80px" }}
                    />
                  </td>
                  <td>
                    <div>
                      <div className="fw-bold">{book.title}</div>
                      <div className="text-muted small">{book.author}</div>
                    </div>
                  </td>
                  <td>{book.isbn}</td>
                  <td>{formatDate(book.borrow_date)}</td>
                  <td className={isOverdue ? "text-danger fw-bold" : ""}>
                    {formatDate(book.due_date)}
                  </td>
                  <td>{book.gid}</td>
                  <td>
                    {isOverdue ? (
                      <span className="text-danger fw-bold">{daysOverdue}</span>
                    ) : (
                      "0"
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      disabled={book.extensionsLeft === 0}
                      onClick={() => {
                        setSelectedBook(book);
                        setShowModal(true);
                      }}
                    >
                      Gia hạn
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Extension Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Gia hạn sách</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn gia hạn sách "{selectedBook?.title}" thêm 14
            ngày?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleExtend}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
}

export default BorrowingBook;
