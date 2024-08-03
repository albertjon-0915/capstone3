import { useState, useEffect } from "react";
import { Button, Offcanvas, Card } from "react-bootstrap";
import CSS from "../App.css";
import Swal from "sweetalert2";

import Pic from "../pictures/icon.webp";

export default function Profile() {
     const [show, setShow] = useState(false);
     const [profile, setProfile] = useState([]);

     const handleClose = () => setShow(false);
     const toggleShow = () => setShow((s) => !s);

     const options = [
          {
               scroll: true,
               backdrop: true,
          },
     ];

     let token = localStorage.getItem("token");

     const getUser = () => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "User not found" || data.error) {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                              text: data.message || data.error,
                         });
                    }

                    setProfile(data);
               });
     };

     useEffect(() => {
          getUser();
     }, [profile]);

     return (
          <>
               <div as={Button} onClick={toggleShow} className="profileButton rounded-circle me-2">
                    <img src={Pic} id="profileButton" />
               </div>
               <Offcanvas show={show} onHide={handleClose} {...options} placement="end">
                    <Offcanvas.Header closeButton>
                         <Offcanvas.Title>{profile.firstName}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                         <Card>
                              <Card.Img variant="top" src={Pic} />
                              <Card.Body>
                                   <Card.Text className="profileCard">
                                        First name: <span>{profile.firstName}</span>
                                   </Card.Text>
                                   <Card.Text className="profileCard">
                                        Last name: <span>{profile.lastName}</span>
                                   </Card.Text>
                                   <Card.Text className="profileCard">
                                        Email: <span>{profile.email}</span>
                                   </Card.Text>
                                   <Card.Text className="profileCard">
                                        Contact Number: <span>{profile.mobileNo}</span>
                                   </Card.Text>
                              </Card.Body>
                         </Card>
                    </Offcanvas.Body>
               </Offcanvas>
          </>
     );
}
