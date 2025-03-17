import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { Header } from "../../components/Header";

export default function ReserveBook() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  localStorage.setItem("userId", "65fa9c8f12e8fc7bfa123456");
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:9000/${userId}/reserve_book`
        );
        setReservations(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu đặt mượn sách.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickupDate = new Date(dateString);
    pickupDate.setHours(0, 0, 0, 0);
    return today.getTime() === pickupDate.getTime();
  };

  return (
    <div className="container py-4">
      <Header />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sách</th>
                  <th>ISBN</th>
                  <th>Ngày yêu cầu</th>
                  <th>Ngày nhận sách</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className={
                      isToday(reservation.pickupDate) ? "table-success" : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <strong>{reservation.title}</strong>
                        <div className="text-muted">{reservation.author}</div>
                      </div>
                    </td>
                    <td>{reservation.isbn}</td>
                    <td>{formatDate(reservation.requestDate)}</td>
                    <td>
                      {formatDate(reservation.pickupDate)}
                      {isToday(reservation.pickupDate) && (
                        <Badge bg="success" className="ms-2">
                          Hôm nay
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      <div className="mt-4 text-muted">
        <p>Lưu ý:</p>
        <ul>
          <li>
            Sách đặt mượn sẽ được giữ trong vòng 3 ngày kể từ ngày nhận sách.
          </li>
          <li>
            Nếu không đến nhận sách đúng hạn, yêu cầu đặt mượn sẽ tự động bị
            hủy.
          </li>
          <li>Vui lòng mang theo thẻ thư viện khi đến nhận sách.</li>
        </ul>
      </div>
    </div>
  );
}
