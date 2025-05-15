import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TableProducts from "components/templates/TableProducts";
import Paginate from "components/modules/Paginate";
import Actions from "components/templates/Actions";
import Search from "components/templates/Search";
import Loader from "components/modules/Loader";
import { useAllProducts } from "hooks/queries";
import { useUser } from "context/UserContext";
import { getInitialQuery } from "utils/query";
import getAllPages from "utils/getAllPages";

import styles from "./HomePage.module.css";

function HomePage() {
  const { user, setUser } = useUser();
  const [allProducts, setAllProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupDelete, setGroupDelete] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [query, setQuery] = useState({
    limit: 10,
    ...getInitialQuery(searchParams),
  });

  const {
    isPending: productsLoading,
    data: products,
    error: productsError,
    refetch,
  } = useAllProducts(query);

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

  useEffect(() => {
    if (!user.token || !document.cookie) setUser({ username: "", token: "" });
  }, [user.token, document.cookie]);

  if (productsLoading) return <Loader />;

  if (productsError) {
    toast.error(
      "خطا در دیافت اطلاعات ، هیچ کالایی با کلمه جستجو شده یا بازه قیمتی وارد شده همخوانی ندارد ، لطفا صفحه را ریلود کنید"
    );
    return setQuery({ page: 1, limit: 10 });
  }

  return (
    <div className={styles.container}>
      <Search setQuery={setQuery} />
      <div className={styles.actions}>
        <Actions
          setCheckBox={setCheckBox}
          setGroupDelete={setGroupDelete}
          groupDelete={groupDelete}
          checkBox={checkBox}
          setQuery={setQuery}
          allProducts={allProducts}
        />
        <div className={styles.table}>
          <TableProducts
            products={products.data}
            checkBox={checkBox}
            setGroupDelete={setGroupDelete}
          />
        </div>
      </div>
      <Paginate query={query} setQuery={setQuery} count={products.totalPages} />
    </div>
  );
}

export default HomePage;
