import { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { GREEN_THEME } from "../const/themeColor";

export function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sách đang mượn", href: "/borrowing-book" },
    { name: "Đặt mượn", href: "/reserve" },
    { name: "Lịch sử", href: "/history" },
    { name: "Yêu cầu sách mới", href: "/suggest" },
  ];

  return (
    <header className="border-bottom">
      <Container className= "">
        <Navbar
          expand="md"
          className="d-flex justify-content-between align-items-center py-2"
        >
          {/* Logo */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            {!isSmallScreen && <span className="fw-bold">Logo</span>}
          </Navbar.Brand>

          {/* Title */}
          <h1 className="text-center flex-grow-1 m-0">BiblioHub</h1>

          {/* Account Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="p-0 border-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {isSmallScreen && (
            <Button
              variant="link"
              onClick={toggleMenu}
              className="p-0 border-0"
            >
              {isMenuOpen ? "✖️" : "☰"}
            </Button>
          )}
        </Navbar>

        {!isSmallScreen && (
          <Nav className="justify-content-center py-2">
            {navItems.map((item) => (
              <Nav.Link key={item.name} href={item.href} className="mx-2">
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        )}

        {isSmallScreen && isMenuOpen && (
          <Nav className="flex-column text-center py-2">
            {navItems.map((item) => (
              <Nav.Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        )}
      </Container>
    </header>
  );
}
