import { useState } from "react";
import { useFetch } from "../hooks/UseFetch";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  console.log(id)
  const [url] = useState("http://localhost:5000/products/" + id);
  const { data, isPending, error } = useFetch(url);

  return (
    <>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <h1 align="center" className="p-3">
        {data.title}
      </h1>
    </>
  );
}

export default Product;
