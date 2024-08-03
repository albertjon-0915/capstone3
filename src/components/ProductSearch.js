import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Banner from "./Banner";
import Swal from "sweetalert2";

export default function ProductSearch({ searchTerm }) {
     console.log("product searcher");
     const [products, setProducts] = useState([]);
     const [isFound, setIsFound] = useState(true);

     const errorHandle = {
          title: "Something went wrong",
          description: "No items found",
     };

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/products/products/search-by-name`, {
               method: "POST",
               body: JSON.stringify({ name: searchTerm }),
               headers: {
                    "Content-type": "application/json",
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.ERROR === "Product not found") {
                         Swal.fire({
                              icon: "error",
                              title: "Something went wrong",
                              text: data.message,
                         });
                         setIsFound(false);
                    } else if (data.message === "Product found") {
                         setIsFound(true);
                         setProducts([data.product]);
                    }
               });
     }, [searchTerm, products]);

     return !isFound ? <Banner prop={errorHandle} /> : <ProductCard Products={products} />;
}
