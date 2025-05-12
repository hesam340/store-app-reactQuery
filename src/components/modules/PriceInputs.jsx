import { useForm } from "react-hook-form";
import Input from "./Input";
import styles from "./PriceInputs.module.css";
import priceSchema from "validation/priceSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { e2p } from "utils/replaceNumber";

function PriceInputs({ setShowPriceModal, setQuery, allProducts }) {
  const [price, setPrice] = useState({});

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

  const confirmHandler = (data) => {
    setQuery((query) => ({
      ...query,
      page: 1,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
    }));
  };

  const cancelHandler = () => {
    setShowPriceModal(false);
    reset();
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Input
          name="minPrice"
          placeholder={` از - ${e2p(+price.minPrice)}`}
          register={register}
          errors={errors}
        />
        <Input
          name="maxPrice"
          placeholder={` تا - ${e2p(+price.maxPrice)}`}
          register={register}
          errors={errors}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleSubmit(confirmHandler)}>اعمال</button>
        <button onClick={() => cancelHandler}>لغو</button>
      </div>
    </form>
  );
}

export default PriceInputs;
