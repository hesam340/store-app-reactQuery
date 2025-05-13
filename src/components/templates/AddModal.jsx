import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import styles from "./AddModal.module.css";
import productSchema from "validation/productSchema";
import ProductInput from "components/modules/ProductInput";
import { useAddProduct } from "hooks/mutations";
import { useEffect } from "react";

function AddModal({
  setShowAddModal,
  mutate: editMutate,
  id,
  setShowEditModal,
  product,
}) {
  const { mutate } = useAddProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (id)
      reset({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
  }, [id]);

  const addHandler = (data) => {
    mutate(data);
    reset();
  };

  const editHandler = (data) => {
    editMutate({ ...data, id });
    reset();
    setShowEditModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form className={styles.form}>
          {id ? <h1>ویرایش اطلاعات</h1> : <h1>ایجاد محصول جدید</h1>}
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
            {id ? (
              <button onClick={handleSubmit(editHandler)}>
                ثبت اطلاعات جدید
              </button>
            ) : (
              <button onClick={handleSubmit(addHandler)}>ایجاد</button>
            )}
            <button
              onClick={() => {
                id ? setShowEditModal(false) : setShowAddModal(false);
              }}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddModal;
