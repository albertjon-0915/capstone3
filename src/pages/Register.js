import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Register() {
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [mobileNo, setMobileNo] = useState("");

     console.log(firstName);
     console.log(lastName);
     console.log(email);
     console.log(password);
     console.log(confirmPassword);
     console.log(mobileNo);

     const registerForm = (e) => {
          e.preventDefault();
          if (
               firstName === "" ||
               lastName === "" ||
               email === "" ||
               password === "" ||
               confirmPassword === "" ||
               mobileNo === NaN
          ) {
               Swal.fire({
                    icon: "error",
                    title: "Please check the form",
                    text: "Missing input Field",
               });
          } else if (password !== confirmPassword) {
               Swal.fire({
                    icon: "error",
                    title: "Please check the form",
                    text: "Passwords do not match",
               });
          } else {
               fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
                    method: "POST",
                    body: JSON.stringify({
                         firstName: firstName,
                         lastName: lastName,
                         email: email,
                         password: password,
                         mobileNo: mobileNo,
                    }),
                    headers: { "Content-type": "Application/json" },
               })
                    .then((res) => res.json())
                    .then((data) => {
                         console.log(data);
                         if (data.message === "User registered successfully") {
                              setFirstName("");
                              setLastName("");
                              setEmail("");
                              setMobileNo("");
                              setPassword("");
                              setConfirmPassword("");

                              Swal.fire({
                                   icon: "success",
                                   title: "Registered Successfully",
                                   text: "Account successfully created",
                              });
                         } else if (data.error === "Duplicate email, you are already registered") {
                              Swal.fire({
                                   icon: "error",
                                   title: "Please choose another email",
                                   text: data.error,
                              });
                         } else {
                              Swal.fire({
                                   icon: "error",
                                   title: "Semething went wrong",
                                   text: data.message,
                              });
                         }
                    });
          }
     };

     return (
          <div className="RegisterContainer">
               <h1 className="py-5 text-white">Register User</h1>
               <Form>
                    <Form.Group className="mb-3 text-white">
                         <Form.Label>First Name</Form.Label>
                         <Form.Control
                              placeholder="Enter you first name"
                              onChange={(e) => {
                                   setFirstName(e.target.value);
                              }}
                         />
                    </Form.Group>

                    <Form.Group className="mb-3 text-white">
                         <Form.Label>Last Name</Form.Label>
                         <Form.Control
                              placeholder="Enter your last name"
                              onChange={(e) => {
                                   setLastName(e.target.value);
                              }}
                         />
                    </Form.Group>

                    <Form.Group className="mb-3 text-white">
                         <Form.Label>Email</Form.Label>
                         <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              onChange={(e) => {
                                   setEmail(e.target.value);
                              }}
                         />
                    </Form.Group>

                    <Row className="mb-3 text-white">
                         <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                   type="password"
                                   placeholder="Password"
                                   onChange={(e) => {
                                        setPassword(e.target.value);
                                   }}
                              />
                         </Form.Group>

                         <Form.Group as={Col} controlId="formGridPassword" text-white>
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                   type="password"
                                   placeholder="Confirm password"
                                   onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                   }}
                              />
                         </Form.Group>
                    </Row>

                    <Form.Group className="mb-3 text-white">
                         <Form.Label>Mobile Number</Form.Label>
                         <Form.Control
                              type="number"
                              placeholder="Enter mobile number"
                              onChange={(e) => {
                                   setMobileNo(parseInt(e.target.value));
                              }}
                         />
                    </Form.Group>

                    {firstName === "" ||
                    lastName === "" ||
                    email === "" ||
                    password === "" ||
                    confirmPassword === "" ||
                    mobileNo === "" ? (
                         <Button variant="secondary" type="submit" onClick={registerForm} disabled>
                              Submit
                         </Button>
                    ) : (
                         <Button variant="primary" type="submit" onClick={registerForm}>
                              Submit
                         </Button>
                    )}
               </Form>
          </div>
     );
}
