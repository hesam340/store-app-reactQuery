import Loader from "components/modules/Loader";
import Paginate from "components/modules/Paginate";
import Main from "components/templates/Main";
import { useAllProducts } from "hooks/queries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function HomePage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(page,query)

  useEffect(() => {
    setSearchParams(query);
  }, [query]);

  const {
    isPending: productsLoading,
    data: products,
    error: productsError,
  } = useAllProducts(query.page);
  console.log({ productsLoading, products, productsError });

  if (productsLoading) return <Loader />;

  if (productsError)
    return toast.error("مشکلی پیش آمده است لطفا دوباره وارد شوید");

  return (
    <div style={{ padding: "20px 50px 30px" }}>
      <Main products={products.data} />
      <Paginate
        page={page}
        setPage={setPage}
        setQuery={setQuery}
        count={products.totalPages}
      />
    </div>
  );
}

export default HomePage;
