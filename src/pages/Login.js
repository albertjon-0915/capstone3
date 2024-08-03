import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserContext from "../userContext";
import Swal from "sweetalert2";

export default function LoginUser() {
     const { user, setUser } = useContext(UserContext);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [isActive, setIsActive] = useState(true);

     console.log("afassf", process.env.REACT_APP_API_BASE_URL);

     function authenticate(e) {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    email: email,
                    password: password,
               }),
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data.access);

                    if (typeof data.access !== "undefined") {
                         localStorage.setItem("token", data.access);
                         retrieveUserDetails(data.access);

                         Swal.fire({
                              title: "Login Successful",
                              icon: "success",
                              text: "Welcome to Aj's Store",
                         });
                    } else if (data.message === "No email found") {
                         Swal.fire({
                              title: "No email found",
                              icon: "error",
                              text: "Email does not exist",
                         });
                    } else {
                         Swal.fire({
                              title: "Authentication Failed",
                              icon: "error",
                              text: "Check your login details and try again",
                         });
                    }
               });
          setEmail("");
          setPassword("");
     }

     const retrieveUserDetails = (token) => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    setUser({
                         id: data._id,
                         isAdmin: data.isAdmin,
                    });
               });
     };

     useEffect(() => {
          if (email !== "" && password !== "") {
               setIsActive(true);
          } else {
               setIsActive(false);
          }
     }, [email, password]);

     return user.id !== null ? (
          <Navigate to="/products" />
     ) : (
          <Form id="LoginFormStyle" onSubmit={(e) => authenticate(e)}>
               <h1 className="my-5 text-center text-white">Login</h1>
               <Form.Group controlId="userEmail">
                    <Form.Label className="text-white">Email address</Form.Label>
                    <Form.Control
                         type="email"
                         placeholder="Enter email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="text-dark"
                         required
                    />
               </Form.Group>

               <Form.Group controlId="password">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                         type="password"
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="text-dark"
                         required
                    />
               </Form.Group>

               {isActive ? (
                    <Button className="my-4" variant="primary" type="submit" id="submitBtn">
                         Submit
                    </Button>
               ) : (
                    <Button className="my-4" variant="secondary" type="submit" id="submitBtn" disabled>
                         Submit
                    </Button>
               )}
          </Form>
     );
}
