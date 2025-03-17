import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

export default function RegisterPage({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    if (!agreeTerms) {
      setError("Bạn cần đồng ý với điều khoản sử dụng");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onRegister) {
        onRegister({ name, email });
      }
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
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
            <p className="text-muted">Tạo tài khoản để truy cập thư viện</p>
          </div>

          <h2 className="text-center mb-4">Đăng ký</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@example.com"
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

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Xác nhận Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="agreeTerms">
              <Form.Check
                type="checkbox"
                label="Tôi đồng ý với điều khoản sử dụng"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Đã có tài khoản? <a href="#" className="text-primary">Đăng nhập</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
