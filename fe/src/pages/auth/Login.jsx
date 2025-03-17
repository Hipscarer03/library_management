import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại. Vui lòng thử lại.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex min-vh-100 align-items-center justify-content-center">
      <Row className="w-100">
        <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center bg-dark text-white">
          <div className="text-center p-4">
            <h1 className="mb-4">BiblioHub</h1>
            <p>Khám phá thế giới tri thức qua hàng ngàn đầu sách trong thư viện của chúng tôi</p>
          </div>
        </Col>
        <Col lg={6} className="p-4">
          <div className="text-center mb-4 d-lg-none">
            <h1>BiblioHub</h1>
            <p className="text-muted">Đăng nhập để truy cập thư viện</p>
          </div>

          <h2 className="text-center mb-4">Đăng nhập</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên đăng nhập"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Chưa có tài khoản? <a href="#" className="text-primary">Đăng ký</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
