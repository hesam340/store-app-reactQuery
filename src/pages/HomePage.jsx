import Loader from "components/modules/Loader";
import Paginate from "components/modules/Paginate";
import Main from "components/templates/Main";
import Search from "components/templates/Search";
import { useAllProducts } from "hooks/queries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import getAllPages from "utils/getAllPages";
import { getInitialQuery } from "utils/query";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    limit: 10,
    ...getInitialQuery(searchParams),
  });
  console.log(query);

  const {
    isPending: productsLoading,
    data: products,
    error: productsError,
    refetch,
  } = useAllProducts(query);
  console.log({ productsLoading, products, productsError });

  useEffect(() => {
    if (products) {
      const allProducts = async () => {
        const fetchProducts = await getAllPages(products.totalPages);
        return setAllProducts(fetchProducts);
      };
      allProducts();
    }
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    refetch();
  }, [query]);

  if (productsLoading) return <Loader />;

  if (productsError) {
    toast.error(
      "خطا در دیافت اطلاعات ، هیچ کالایی با کلمه جستجو شده یا بازه قیمتی وارد شده همخوانی ندارد ، لطفا صفحه را ریلود کنید"
    );
    return setQuery({ page: 1, limit: 10 });
  }

  return (
    <div style={{ padding: "20px 50px 30px" }}>
      <Search setQuery={setQuery} />
      <Main
        products={products.data}
        setQuery={setQuery}
        allProducts={allProducts}
      />
      <Paginate query={query} setQuery={setQuery} count={products.totalPages} />
    </div>
  );
}

export default HomePage;
