import { Row, Col, Card, Button, Modal, Form, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../userContext";

export default function ProductCard({ Products, SearchCart }) {
     const { user } = useContext(UserContext);
     const [showModal, setShowModal] = useState(false);
     const [currentProduct, setCurrentProduct] = useState(null);
     const [quantity, setQuantity] = useState("");

     let token = localStorage.getItem("token");

     const handleShowModal = (product) => {
          setCurrentProduct(product);
          setShowModal(true);
     };

     const addToCart = (e) => {
          e.preventDefault();
          if (!currentProduct) return;

          fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/add-to-cart`, {
               method: "POST",
               body: JSON.stringify({
                    cartItems: [
                         {
                              productId: currentProduct._id,
                              quantity: quantity,
                         },
                    ],
               }),
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Cart updated successfully") {
                         Swal.fire({
                              icon: "success",
                              title: "Successfully added to cart",
                              text: data.message,
                         });
                    } else {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                              text: data.error,
                         });
                    }
               });

          closeEdit();
     };

     const closeEdit = () => {
          setShowModal(false);
          setCurrentProduct(null);
          setQuantity(0);
     };

     // useEffect(() => {
     //     mapping();
     // }, [Products])

     console.log(Products);

     return (
          <Col>
               <Row>
                    {Products.length === 0 ? (
                         <Container fluid className="p-5 mt-5">
                              <Row>
                                   <Col className="text-center text-white">
                                        <h1>Searching</h1>
                                        <p>No products found...</p>
                                   </Col>
                              </Row>
                         </Container>
                    ) : (
                         Products.map((product) => {
                              const { _id, name, description, price } = product;
                              return (
                                   <Col key={_id} className="p-5">
                                        <Card className="p-3 my-3 cardStyle">
                                             <Card.Body>
                                                  <Card.Title>{name}</Card.Title>
                                                  <Card.Text>{description}</Card.Text>
                                                  <Card.Text>${price}</Card.Text>
                                                  {user.id !== null ? (
                                                       <Button
                                                            variant="primary"
                                                            onClick={() => handleShowModal(product)}
                                                       >
                                                            Add to Cart
                                                       </Button>
                                                  ) : (
                                                       <Button variant="primary" as={Link} to={"/login"}>
                                                            Add to Cart
                                                       </Button>
                                                  )}
                                             </Card.Body>
                                        </Card>
                                   </Col>
                              );
                         })
                    )}

                    <Modal show={showModal} onHide={closeEdit}>
                         <Form onSubmit={addToCart}>
                              <Modal.Header closeButton>
                                   <Modal.Title>Adding to Cart...</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                   <Form.Group>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                             type="number"
                                             value={quantity}
                                             onChange={(e) => setQuantity(e.target.value)}
                                             required
                                        />
                                   </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                   <Button variant="secondary" onClick={closeEdit}>
                                        Close
                                   </Button>
                                   <Button variant="success" type="submit">
                                        Add to Cart
                                   </Button>
                              </Modal.Footer>
                         </Form>
                    </Modal>
               </Row>
          </Col>
     );
}
