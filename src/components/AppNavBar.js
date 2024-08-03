import { Container, Navbar, Button, Form, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../userContext";
import Profile from "./Profile";

import CSS from "../App.css";

export default function AppNavBar() {
     const { user } = useContext(UserContext);

     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

     console.log(user.isAdmin);

     return (
          <Navbar expand="lg" id="AppNavBarStyle" className="px-5">
               <Container fluid>
                    <Navbar.Brand className="text-white">Aj's Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                         <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                              <Nav.Link className="text-white" as={Link} to={"/"}>
                                   Home
                              </Nav.Link>

                              <Nav.Link className="text-white" as={Link} to={"/products"}>
                                   Products
                              </Nav.Link>

                              {!user.isAdmin ? (
                                   <NavDropdown title="Oders" className="me-5 Web_Navbar" id="navbarScrollingDropdown">
                                        <NavDropdown.Item as={Link} to={user.id !== null ? "/cart" : "/login"}>
                                             Cart
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item as={Link} to={user.id !== null ? "/order" : "/login"}>
                                             Orders
                                        </NavDropdown.Item>
                                   </NavDropdown>
                              ) : (
                                   <>
                                        <Nav.Link className="text-white" as={Link} to={"/order"}>
                                             Orders
                                        </Nav.Link>
                                   </>
                              )}

                              {user.id === null ? (
                                   <>
                                        <Nav.Link className="text-white" as={Link} to={"/login"}>
                                             Login
                                        </Nav.Link>
                                        <Nav.Link className="text-white" as={Link} to={"/register"}>
                                             Register
                                        </Nav.Link>
                                   </>
                              ) : (
                                   <>
                                        <Nav.Link className="text-white me-3" as={Link} to={"/logout"}>
                                             Logout
                                        </Nav.Link>
                                        <Profile />
                                   </>
                              )}
                         </Nav>
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
}
