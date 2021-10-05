import React, { useState } from "react";
import { Navbar, Nav, Form, Col,Modal,Button ,Container } from "react-bootstrap";
import {
  UserAddOutlined,
  UserSwitchOutlined,
  PoweroffOutlined,
  UserOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./Header.css";
import axios from "axios";


const Header = () => {
  let hasToken;
  let hasRole;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (localStorage.getItem("authToken")) {
    hasToken = localStorage.getItem("authToken");
  }
  if (localStorage.getItem("userRole")) {
    hasRole = localStorage.getItem("userRole");
  }

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location = "/";
  };

  //login configurations
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginRole, setLoginRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleOk = () => {
    setConfirmLoading(true);

    if (password.length > 5 && email.length !== 0 && loginRole !== "") {
      setError("");
      loginHandler();
    } else {
      setConfirmLoading(false);
      setError("Invalid credentials! Please check your email & password.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const loginHandler = async () => {
    let postObject = { email, password, role: loginRole };

    await axios
      .post("http://localhost:6500/codebusters/api/auth/login", postObject)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        setVisible(false);
        setConfirmLoading(false);
        if (res.data.user.role === "doctor") {
          window.location = `/profile/doctor`;
        }  else if(res.data.user.role === "patient") {
          window.location = `/profile/patient`
        }
        else if(res.data.user.role === "labchemist") {
          window.location = `/profile/labchemist`
        }
        else if(res.data.user.role === "pharmasist") {
          window.location = `/profile/pharmasist`
        }
        else {
          window.location = `/profile/${res.data.user.role}`;
        }
      })
      .catch((err) => {
        alert("Unauthorized access detected!");
        window.location = "/";
      });
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setVisible(false);
  };

  return (
    <div>
      <Navbar
        className="custome-nav-bar-styles"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
<Container>
      <Navbar.Brand href="/">
      <div className="web-brand-name">
        <img
          alt="Logo"
          src="https://res.cloudinary.com/iplus/image/upload/v1627570231/SPM/logo_copy_qfmuvj.png"
          width="80"
          height="80"
          className="d-inline-block align-top"
        />{' '}
      iCross</div>
      </Navbar.Brand>
    </Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {hasToken && (
              <Nav.Link
                href={`/profile/${hasRole}`}
                className="custom-style-header-navlinks"
              >
                <UserOutlined style={{ fontSize: "1.5em" }} />
                Profile
              </Nav.Link>
            )}



            {hasToken && (
              <Nav.Link
                href="/contactus"
                className="custom-style-header-navlinks"
              >
                <PhoneOutlined style={{ fontSize: "1.5em" }} />
                ContactUs
              </Nav.Link>
            )}
 {!hasToken && (
              <Nav.Link
                href="/contactus"
                className="custom-style-header-navlinks"
              >
                <PhoneOutlined style={{ fontSize: "1.5em" }} />
                ContactUs
              </Nav.Link>
            )}
            {!hasToken && (
              <Nav.Link
                href="/registration"
                className="custom-style-header-navlinks"
              >
                <UserAddOutlined style={{ fontSize: "1.5em" }} />
                SignUp
              </Nav.Link>
            )}

            {!hasToken && (
              <Nav.Link
                className="custom-style-header-navlinks"
                style={{ paddingRight: "10vw" }}
                onClick={handleShow}
              >
                <UserSwitchOutlined style={{ fontSize: "1.5em" }} />
                Login
              </Nav.Link>
            )}

            {hasToken && (
              <Nav.Link
                onClick={logOutHandler}
                className="custom-style-header-navlinks"
                style={{ paddingRight: "10vw" }}
              >
                <PoweroffOutlined style={{ fontSize: "1.5em" }} />
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose} visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading} closable={false}
        width="10vw" >
        <Modal.Header closeButton>
          <Modal.Title>Login as:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
          {error && <span className="error-message">{error}</span>}
          <Form.Label as="legend" column sm={12}>
            Login as:
          </Form.Label>
          <Col sm={12}>
            <Form.Check
              type="radio"
              required={true}
              label="Doctor"
              onClick={() => {
                setLoginRole("doctor");
              }}
              id="formHorizontalRadios1"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Patient"
              onClick={() => {
                setLoginRole("patient");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Labchemist"
              onClick={() => {
                setLoginRole("labchemist");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
          <Form.Check
              type="radio"
              required={true}
              label="Pharmasist"
              onClick={() => {
                setLoginRole("pharmasist");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />

          </Col>
          <Form.Control
            type="email"
            placeholder="Enter email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
          <Form.Control
            type="password"
            placeholder="Enter Password.."
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
        </Form.Group>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
             Login
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal
        title="Login"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        closable={false}
        width="20vw"
      >
        <Form.Group>
          {error && <span className="error-message">{error}</span>}
          <Form.Label as="legend" column sm={12}>
            Login as:
          </Form.Label>
          <Col sm={12}>
            <Form.Check
              type="radio"
              required={true}
              label="Attendee"
              onClick={() => {
                setLoginRole("attendee");
              }}
              id="formHorizontalRadios1"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Researcher"
              onClick={() => {
                setLoginRole("researcher");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
            <Form.Check
              type="radio"
              required={true}
              label="Workshop-Conductor"
              onClick={() => {
                setLoginRole("workshop conductor");
              }}
              id="formHorizontalRadios2"
              name="formHorizontalRadios"
            />
          </Col>
          <Form.Control
            type="email"
            placeholder="Enter email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
          <Form.Control
            type="password"
            placeholder="Password.."
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "3vh" }}
          />
        </Form.Group>
      </Modal>
    </div>
  );
};

export default Header;