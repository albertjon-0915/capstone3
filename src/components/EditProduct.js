import { useState, useEffect } from "react";
import { Modal, Form, Button, textarea } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditProduct({ fetchData, ID }) {
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState(0);
     const [showModal, setShowModal] = useState(false);
     const [productDetails, setProductDetails] = useState([]);

     let token = localStorage.getItem("token");

     console.log(name);
     console.log(description);
     console.log(price);
     console.log(productDetails);

     const Edit = (e) => {
          e.preventDefault();
          if (name === "" && price === 0 && description === "") {
               Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    text: "Check the input fields if correctly filled",
               });
          } else {
               const jsonBody = {};
               fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ID}/update`, {
                    method: "PATCH",
                    body: JSON.stringify({
                         name: name !== "" ? name : productDetails.name,
                         description: description !== "" ? description : productDetails.description,
                         price: price !== "" ? price : productDetails.price,
                    }),
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`,
                    },
               })
                    .then((res) => res.json())
                    .then((data) => {
                         if (data.message === "Successfully updated the product") {
                              Swal.fire({
                                   icon: "success",
                                   title: "Success",
                                   text: data.message,
                              });
                              fetchData();
                         } else {
                              Swal.fire({
                                   icon: "error",
                                   title: "Something went wrong",
                                   text: data.message,
                              });
                              fetchData();
                         }
                    });
               closeEdit();
          }
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

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ID}`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data) {
                         setProductDetails(data);
                    } else {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                         });
                    }
               });
     }, [productDetails]);

     return (
          <>
               <Button variant="danger" onClick={handleShowModal}>
                    Edit
               </Button>

               <Modal show={showModal} onHide={closeEdit}>
                    <Form onSubmit={Edit}>
                         <Modal.Header closeButton>
                              <Modal.Title>Editing product...</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                              <Form.Group>
                                   <Form.Label>Name</Form.Label>
                                   <Form.Control
                                        placeholder={productDetails.name}
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group>
                                   <Form.Label>Description</Form.Label>
                                   <Form.Control
                                        as="textarea"
                                        placeholder={productDetails.description}
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                   />
                              </Form.Group>
                              <Form.Group>
                                   <Form.Label>Price</Form.Label>
                                   <Form.Control
                                        placeholder={productDetails.price}
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(parseInt(e.target.value))}
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
