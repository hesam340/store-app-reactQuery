import TableRow from "components/modules/TableRow";
import titles from "constants/tableTitles";

import styles from "./TableProducts.module.css";

function TableProducts({ products, checkBox, setGroupDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {checkBox && <th></th>}
          {titles.map((i) => (
            <th key={i.id}>{i.title}</th>
          ))}
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
