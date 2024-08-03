import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";

import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import AdminView from "./AdminProductView";

export default function GetActiveProducts() {
     const { user } = useContext(UserContext);

     const [products, setProducts] = useState([]);
     const [search, setSearch] = useState("");
     const [productName, setProductName] = useState("");

     const fetchData = () => {
          console.log(user.isAdmin);

          let token = localStorage.getItem("token");
          let fetchURL =
               user.isAdmin === true
                    ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
                    : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

          console.log(fetchURL);

          fetch(fetchURL, {
               method: "GET",
               headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    setProducts(data);
               });
     };

     useEffect(() => {
          fetchData();
     }, [productName, search]);

     const resetSearch = () => {
          setSearch("");
          setProductName("");
     };

     return (
          <>
               {!user.isAdmin && user.isAdmin !== null ? (
                    <Form as={Container} className="d-flex pt-5">
                         <Form.Control
                              type="search"
                              placeholder="Search"
                              className="me-2"
                              aria-label="Search"
                              onChange={(e) => setSearch(e.target.value)}
                         />
                         <Button className="btn-primary" id="NavbarSearchButton" onClick={() => setProductName(search)}>
                              Search
                         </Button>
                    </Form>
               ) : null}

               {search !== "" && productName !== "" ? (
                    <ProductSearch searchTerm={productName} Search={search} />
               ) : user.isAdmin && user.isAdmin !== null ? (
                    <AdminView Products={products} fetchData={fetchData} />
               ) : (
                    <ProductCard Products={products} />
               )}

               {search === "" && productName !== "" && resetSearch()}
          </>
     );
}
