import Loader from "components/modules/Loader";
import Main from "components/templates/Main";
import { useAllProducts } from "hooks/queries";
import { useState } from "react";
import { toast } from "react-toastify";

function HomePage() {
  const [page, setPage] = useState();
  const [query, setQuery] = useState({});
  const {
    isPending: productsLoading,
    data: products,
    error: productsError,
  } = useAllProducts();
  console.log({ productsLoading, products, productsError });

  if (productsLoading) return <Loader />;

  if (productsError)
    return toast.error("مشکلی پیش آمده است لطفا دوباره وارد شوید");

  return (
    <div style={{ padding: "20px 50px 30px" }}>
      <Main products={products.data} />
    </div>
  );
}

export default HomePage;
