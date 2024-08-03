import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";

export default function AdminView({ Products, fetchData }) {
     const [productData, setProductData] = useState([]);

     let token = localStorage.getItem("token");

     const Archive = (ID) => {
          console.log(ID);
          fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ID}/archive`, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Successfully archived the product") {
                         Swal.fire({
                              icon: "success",
                              title: "Successfully changed status",
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
     };

     const Activate = (ID) => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${ID}/activate`, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Product successfully activated") {
                         Swal.fire({
                              icon: "success",
                              title: "Successfully changed status",
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
     };

     useEffect(() => {
          const productsMapped = Products.map((item) => {
               return (
                    <tr>
                         <td>
                              <EditProduct ID={item._id} fetchData={fetchData} />
                         </td>

                         <td>{item._id}</td>
                         <td>{item.name}</td>
                         <td>{item.description}</td>
                         <td>{item.price}</td>
                         <td>
                              {item.isActive ? (
                                   <Button variant="success" onClick={(e) => Archive(item._id)}>
                                        Active
                                   </Button>
                              ) : (
                                   <Button variant="warning" onClick={(e) => Activate(item._id)}>
                                        Archived
                                   </Button>
                              )}
                         </td>
                    </tr>
               );
          });

          setProductData(productsMapped);
     }, [Products, fetchData]);

     return (
          <>
               {/* <Button variant="success" className="mt-5">
                    +Create
               </Button> */}

               <CreateProduct fetchData={fetchData} />
               <Table striped bordered hover variant="dark" className="my-5">
                    <thead>
                         <tr className="text-center">
                              <th>actions</th>
                              <th>id</th>
                              <th>product Name</th>
                              <th>Description</th>
                              <th>Price</th>
                              <th>status</th>
                         </tr>
                    </thead>
                    <tbody>{productData}</tbody>
               </Table>
          </>
     );
}
