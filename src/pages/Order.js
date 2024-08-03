import { Card, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Order() {
     const [addedProducts, setAddedProducts] = useState([]);
     const [totalPrice, setTotalPrice] = useState(0);
     const [status, setStatus] = useState("");
     const [date, setDate] = useState("");
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(null);

     let token = localStorage.getItem("token");

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/order/my-orders`, {
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => {
                    if (!res.ok) {
                         throw new Error("Failed to fetch order details");
                    }
                    return res.json();
               })
               .then((data) => {
                    console.log("Order", data);
                    setTotalPrice(data.totalPrice);
                    setStatus(data.status);
                    setDate(data.orderedOn);

                    const promises = data.productsOrdered.map((item) => {
                         return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${item.productId}`).then((res) =>
                              res.json()
                         );
                    });
                    Promise.all(promises)
                         .then((products) => {
                              const updatedProducts = products.map((product, index) => {
                                   return {
                                        name: product.name,
                                        description: product.description,
                                        quantity: data.productsOrdered[index].quantity,
                                        subtotal: data.productsOrdered[index].subtotal,
                                   };
                              });
                              setAddedProducts(updatedProducts);
                              console.log("Added", addedProducts);
                              setIsLoading(false);
                         })
                         .catch((error) => {
                              setError(error.message);
                              setIsLoading(false);
                         });
               })
               .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
               });
     }, [token]);

     return (
          <Card as={Row} className="p-3 my-3">
               <Card.Body>
                    <h1>Orders</h1>
                    {addedProducts.map((product, index) => (
                         <Card key={index} className="my-5">
                              <Card.Body>
                                   <Card.Title>{product.name}</Card.Title>
                                   <Card.Text>{product.description}</Card.Text>
                                   <Card.Text>Quantity: {product.quantity}</Card.Text>
                                   <Card.Text>Subtotal: {product.subtotal}</Card.Text>
                                   <Card.Text>Ordered on: {date}</Card.Text>
                              </Card.Body>
                         </Card>
                    ))}
               </Card.Body>
          </Card>
     );
}
