import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useDeleteProduct } from "hooks/mutations";
import { useUser } from "context/UserContext";
import { sp } from "utils/replaceNumber";
import DeleteModal from "./DeleteModal";
import productId from "utils/productId";
import AddModal from "./AddModal";

import styles from "./TableRow.module.css";

function TableRow({ product, checkBox, setGroupDelete }) {
  const { name, quantity, price, id } = product;
  const [checked, setChecked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();

  const { mutate } = useDeleteProduct();

  useEffect(() => {
    setGroupDelete((item) => {
      if (checked) {
        return [...item, product];
      } else {
        return item.filter((data) => data.id !== id);
      }
    });
  }, [checked]);

  useEffect(() => {
    if (!checkBox) {
      setChecked(false);
    }
  }, [checkBox]);

  const editHandler = () => {
    if (user.token) {
      setShowEditModal(true);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const deleteHandler = () => {
    if (user.token) {
      setShowDeleteModal(true);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const confirmHandler = () => {
    mutate(id);
  };

  return (
    <tr className={styles.row}>
      {checkBox && (
        <td>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked((checked) => !checked)}
          />
        </td>
      )}
      <td>{name}</td>
      <td>{sp(quantity)}</td>
      <td>{sp(price)}</td>
      <td>{productId(id)}</td>
      <td>
        <div>
          <button onClick={editHandler}>
            <img src="./edit.svg" alt="edit" />
          </button>
          <button onClick={deleteHandler}>
            <img src="./trash.svg" alt="trash" />
          </button>
        </div>
      </td>
      {showEditModal && (
        <AddModal
          id={id}
          setShowEditModal={setShowEditModal}
          product={product}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          count={1}
          confirmHandler={confirmHandler}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </tr>
  );
}

export default TableRow;
