import Loader from "components/modules/Loader";
import Paginate from "components/modules/Paginate";
import Main from "components/templates/Main";
import { useAllProducts } from "hooks/queries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createQueryObject } from "utils/query";
import { getInitialQuery } from "utils/query";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = getInitialQuery(searchParams);
  const [page, setPage] = useState(Number(initialQuery.page || 1));
  const [query, setQuery] = useState({ ...initialQuery, limit: 10 });
  console.log(searchParams.get("page"));

  const {
    isPending: productsLoading,
    data: products,
    error: productsError,
  } = useAllProducts(query.page);
  console.log({ productsLoading, products, productsError });

  useEffect(() => {
    const newQuery = createQueryObject(query, { page });
    setQuery(newQuery);
    setSearchParams(newQuery);
  }, [page]);

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
