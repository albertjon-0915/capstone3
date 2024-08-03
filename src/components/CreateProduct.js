import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CreateProduct({ fetchData }) {
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState(0);
     const [showModal, setShowModal] = useState(false);
     const [productDetails, setProductDetails] = useState([]);

     let token = localStorage.getItem("token");

     const Create = (e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
               method: "POST",
               body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
               }),
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Product already on the list") {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                              text: data.message,
                         });
                         fetchData();
                    } else {
                         Swal.fire({
                              icon: "success",
                              title: "Successfully Added",
                              text: data.message,
                         });
                         fetchData();
                    }
               });
     };

     const handleShowModal = (productId) => {
          setShowModal(true);
     };

     const closeEdit = () => {
          setShowModal(false);
          setName("");
          setDescription("");
          setPrice(0);
     };
     return (
          <>
               <Button variant="success" className="mt-5" onClick={handleShowModal}>
                    +Create
               </Button>

               <Modal show={showModal} onHide={closeEdit}>
                    <Form onSubmit={Create} className="text-dark">
                         <Modal.Header closeButton className="text-dark">
                              <Modal.Title className="text-dark">Creating product...</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                              <Form.Group>
                                   <Form.Label className="text-dark">Name</Form.Label>
                                   <Form.Control
                                        placeholder={productDetails.name}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-dark"
                                        required
                                   />
                              </Form.Group>
                              <Form.Group>
                                   <Form.Label className="text-dark">Description</Form.Label>
                                   <Form.Control
                                        as="textarea"
                                        placeholder={productDetails.description}
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="text-dark"
                                        required
                                   />
                              </Form.Group>
                              <Form.Group>
                                   <Form.Label className="text-dark">Price</Form.Label>
                                   <Form.Control
                                        placeholder={productDetails.price}
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(parseInt(e.target.value))}
                                        className="text-dark"
                                        required
                                   />
                              </Form.Group>
                         </Modal.Body>
                         <Modal.Footer>
                              <Button variant="secondary" onClick={closeEdit}>
                                   Close
                              </Button>
                              <Button variant="success" type="submit">
                                   Update
                              </Button>
                         </Modal.Footer>
                    </Form>
               </Modal>
          </>
     );
}
