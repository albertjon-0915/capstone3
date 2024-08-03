import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import CSS from "../App.css";
import Swal from "sweetalert2";

export default function AddQuantity({ id, fetchData }) {
     const [currentProduct, setCurrentProduct] = useState(null);
     const [quantity, setQuantity] = useState(0);
     const [showModal, setShowModal] = useState(false);

     const AddingQuantity = (e) => {
          let token = localStorage.getItem("token");
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/update-cart-quantity`, {
               method: "PATCH",
               body: JSON.stringify({
                    cartItems: [
                         {
                              productId: id,
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
                         fetchData();
                    } else {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                              text: data.error,
                         });
                         fetchData();
                    }
               });

          closeEdit();
     };

     const handleShowModal = (product) => {
          setCurrentProduct(product);
          setShowModal(true);
     };

     const closeEdit = () => {
          setShowModal(false);
          setCurrentProduct(null);
          setQuantity(0);
     };

     return (
          <>
               <Button className="mx-1" onClick={handleShowModal}>
                    Add Quantity
               </Button>

               <Modal show={showModal} onHide={closeEdit}>
                    <Form onSubmit={AddingQuantity}>
                         <Modal.Header closeButton>
                              <Modal.Title className="Title_Forms">Ordering more...</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                              <Form.Group>
                                   <Form.Label className="Title_Forms">Quantity</Form.Label>
                                   <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        required
                                   />
                              </Form.Group>
                         </Modal.Body>
                         <Modal.Footer>
                              <Button variant="secondary" onClick={closeEdit}>
                                   Close
                              </Button>
                              <Button variant="success" type="submit">
                                   Add
                              </Button>
                         </Modal.Footer>
                    </Form>
               </Modal>
          </>
     );
}
