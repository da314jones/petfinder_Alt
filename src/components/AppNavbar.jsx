import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./nav.css";

export default function AppNavBar() {
  return (
    <Navbar className="navbar-script ">
      <Container className="nav_container">
        <Navbar.Brand as={Link} className="home" to="/">
          Home{" "}
        </Navbar.Brand>
        <Navbar.Brand className="pets-list" as={Link} to="/petlist">
          Pets{" "}
        </Navbar.Brand>
        <Navbar.Brand className="dashboard" as={Link} to="/userDashboard/${petId}">
          Dashboard{" "}
        </Navbar.Brand>
        <Navbar.Brand className="adoption" as={Link} to="/adoption">
          Adoption{" "}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
