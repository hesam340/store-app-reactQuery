import TableProducts from "components/modules/TableProducts";
import React, { useState } from "react";

import styles from "./Main.module.css";
import AddModal from "./AddModal";

function Main({ products }) {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.titleRight}>
          <img src="./setting-3.svg" alt="مدیریت کالا" />
          <p>مدیریت کالا</p>
        </div>
        <div className={styles.titleLeft}>
          <button className={styles.priceBaseButton}>جستجو بر اساس قیمت</button>
          <button className={styles.deleteButton}>حذف گروهی</button>
          <button className={styles.addButton} onClick={() => setShowAddModal(true)}>افزودن محصول</button>
        </div>
      </div>
      <div className={styles.main}>
        <TableProducts products={products} />
      </div>
      {showAddModal && <AddModal setShowAddModal={setShowAddModal} />}
    </div>
  );
}

export default Main;
