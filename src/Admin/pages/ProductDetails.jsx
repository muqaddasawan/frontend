import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    axios
      .get("/api/products/single-product/" + id)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Single Product</h2>
      {/* <h3>{props.match.params.id}</h3> */}
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.city}</p>

      <img src={`https://api.thebaklavaboxx.co.uk/${product.thumbnail}`} />
    </div>
  );
};

export default ProductDetails;
