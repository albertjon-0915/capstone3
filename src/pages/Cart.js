import { Card, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import CheckOut from "../components/CheckOut";
import AddQuantity from "../components/AddQuantity";
import RemoveFromCart from "../components/RemoveFromCart";
import Swal from "sweetalert2";

export default function Cart() {
     const [addedProducts, setAddedProducts] = useState([]);
     const [totalPrice, setTotalPrice] = useState(0);
     const [cartItems, setCartItems] = useState([]);
     const [itemsForMap, setItemsForMap] = useState([]);

     let token = localStorage.getItem("token");

     const fetchData = () => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/get-cart`, {
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.ERROR === "Failled to get cart items") {
                         console.log("No Items");
                         setCartItems([]);
                    } else {
                         console.log(data);
                         const { cart } = data;
                         setCartItems(cart.cartItems);
                         // setTotalPrice(cart.totalPrice);

                         const promises = cart.cartItems.map((item) => {
                              return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${item.productId}`).then(
                                   (res) => res.json()
                              );
                         });

                         Promise.all(promises).then((products) => {
                              const updatedProducts = products.map((product, index) => {
                                   return {
                                        id: product._id,
                                        name: product.name,
                                        description: product.description,
                                        quantity: cart.cartItems[index].quantity,
                                        subtotal: cart.cartItems[index].subtotal,
                                   };
                              });
                              setAddedProducts(updatedProducts);

                              const reduceFunc_Subtotal = updatedProducts.reduce((acc, item) => acc + item.subtotal, 0);

                              setTotalPrice(reduceFunc_Subtotal);
                         });
                    }
               });
     };

     useEffect(() => {
          fetchData();
     }, []);

     function clearCart() {
          setTotalPrice(null);
          setCartItems([]);
          setItemsForMap([]);
          setAddedProducts([]);

          let token = localStorage.getItem("token");
          fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/clear-cart`, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          });
     }

     return (
          <Card as={Row} className="p-3 my-3">
               <Card.Body>
                    <h1>My Cart</h1>
                    {addedProducts.map((product, index) => {
                         return (
                              <Card key={index} className="my-5">
                                   <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Card.Text>quantity: {product.quantity}</Card.Text>
                                        <Card.Text>SubTotal: {product.subtotal}</Card.Text>
                                        <Container>
                                             <RemoveFromCart id={product.id} />
                                             <AddQuantity id={product.id} fetchData={fetchData} />
                                        </Container>
                                   </Card.Body>
                              </Card>
                         );
                    })}
                    <CheckOut totalPrice={totalPrice} clearCart={clearCart} fetchData={fetchData} />
               </Card.Body>
          </Card>
     );
}
