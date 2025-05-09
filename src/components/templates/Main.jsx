import TableProducts from "components/modules/TableProducts";
import React from "react";

import styles from "./Main.module.css";

function Main({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.titleRight}>
          <img src="./setting-3.svg" alt="مدیریت کالا" />
          <p>مدیریت کالا</p>
        </div>
        <div className={styles.titleLeft}>
          <button>حذف گروهی</button>
          <button>افزودن محصول</button>
        </div>
      </div>
      <div className={styles.main}>
        <TableProducts products={products} />
      </div>
    </div>
  );
}

export default Main;
