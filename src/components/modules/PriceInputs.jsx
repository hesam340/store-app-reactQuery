import { useForm } from "react-hook-form";
import Input from "./Input";
import styles from "./PriceInputs.module.css";
import priceSchema from "validation/priceSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { e2p } from "utils/replaceNumber";
import { useSearchParams } from "react-router-dom";

function PriceInputs({ setQuery, allProducts, query }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState({});

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    if (allProducts) {
      const allPrice = allProducts.map((i) => i.price);
      setPrice((price) => ({
        ...price,
        minPrice: Math.min(...allPrice),
        maxPrice: Math.max(...allPrice),
      }));
    }
  }, [allProducts]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(priceSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    reset({ minPrice, maxPrice });
  }, []);

  const confirmHandler = (data) => {
    setQuery((query) => {
      const newQuery = { ...query, page: 1 };

      if (data.minPrice !== null && data.minPrice !== "") {
        newQuery.minPrice = data.minPrice;
      } else {
        delete newQuery.minPrice;
      }

      if (data.maxPrice !== null && data.maxPrice !== "") {
        newQuery.maxPrice = data.maxPrice;
      } else {
        delete newQuery.maxPrice;
      }

      return newQuery;
    });
  };

  const cancelHandler = () => {
    reset({ minPrice: "", maxPrice: "" });
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Input
          name="minPrice"
          placeholder={`از - ${e2p(+price.minPrice)}`}
          register={register}
          errors={errors}
        />
        <Input
          name="maxPrice"
          placeholder={`تا - ${e2p(+price.maxPrice)}`}
          register={register}
          errors={errors}
        />
      </div>
      <button onClick={handleSubmit(confirmHandler)}>اعمال</button>
    </form>
  );
}

export default PriceInputs;
