import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./AddModal.module.css";
import productSchema from "validation/productSchema";
import ProductInput from "components/modules/ProductInput";
import { useAddProduct } from "hooks/mutations";

function AddModal({ setShowAddModal }) {
  const { mutate } = useAddProduct()

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
    mutate(data);
    reset();
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form className={styles.form}>
          <h1>ایجاد محصول جدید</h1>
          <div className={styles.inputs}>
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
          </div>
          <div className={styles.buttons}>
            <button onClick={handleSubmit(addHandler)}>ایجاد</button>
            <button onClick={() => setShowAddModal(false)}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddModal