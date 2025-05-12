import TableProducts from "components/modules/TableProducts";
import React, { useState } from "react";

import styles from "./Main.module.css";
import Actions from "components/modules/Actions";

function Main({ products, setQuery , allProducts, query}) {
  const [groupDelete, setGroupDelete] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  return (
    <div className={styles.container}>
      <Actions
        setCheckBox={setCheckBox}
        setGroupDelete={setGroupDelete}
        groupDelete={groupDelete}
        checkBox={checkBox}
        setQuery={setQuery}
        allProducts={allProducts}
        query={query}
      />
      <div className={styles.main}>
        <TableProducts
          products={products}
          checkBox={checkBox}
          setGroupDelete={setGroupDelete}
        />
      </div>
    </div>
  );
}

export default Main;
