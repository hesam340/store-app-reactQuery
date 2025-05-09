import productId from "utils/productId";

import styles from "./TableProducts.module.css";

function TableProducts({ products }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>نام کالا</th>
          <th>موجودی</th>
          <th>قیمت</th>
          <th>شناسه کالا</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <TableRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
}

export default TableProducts;

function TableRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{productId(product.id)}</td>
      <td>
        <div>
          <button>
            <img src="./edit.svg" alt="edit" />
          </button>
          <button>
            <img src="./trash.svg" alt="trash" />
          </button>
        </div>
      </td>
    </tr>
  );
}
