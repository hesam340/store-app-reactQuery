import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./AddModal.module.css";
import productSchema from "validation/productSchema";
import ProductInput from "components/modules/ProductInput";
import { useAddProduct } from "hooks/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "configs/api";

function AddModal({ setShowAddModal }) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({mutationFn:(data)=>{api.post("/products",data)},onSuccess:()=>{queryClient.invalidateQueries("products")}});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onTouched",
  });

  const addHandler = (data) => {
    mutate(data)
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form>
          <h1>ایجاد محصول جدید</h1>
          <ProductInput
            title="نام کالا"
            name="name"
            register={register}
            errors={errors}
          />
          <ProductInput
            title="تعداد موجودی"
            name="quantity"
            register={register}
            errors={errors}
          />
          <ProductInput
            title="قیمت"
            name="price"
            register={register}
            errors={errors}
          />
          <div>
            <button onClick={handleSubmit(addHandler)}>ایجاد</button>
            <button onClick={() => setShowAddModal(false)}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddModal