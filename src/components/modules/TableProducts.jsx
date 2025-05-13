import productId from "utils/productId";
import { sp } from "utils/replaceNumber";

import styles from "./TableProducts.module.css";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";

function TableProducts({ products, checkBox, setGroupDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {checkBox && <th></th>}
          <th>نام کالا</th>
          <th>موجودی</th>
          <th>قیمت (تومان)</th>
          <th>شناسه کالا</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <TableRow
            key={product.id}
            product={product}
            checkBox={checkBox}
            setGroupDelete={setGroupDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableProducts;

function TableRow({ product, checkBox, setGroupDelete }) {
  const { name, quantity, price, id } = product;
  const [checked, setChecked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  return (
    <tr>
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
          <button onClick={() => setShowEditModal(true)}>
            <img src="./edit.svg" alt="edit" />
          </button>
          <button>
            <img src="./trash.svg" alt="trash" />
          </button>
        </div>
      </td>
      {showEditModal && (
        <EditModal id={id} setShowEditModal={setShowEditModal} product={product} />
      )}
    </tr>
  );
}
