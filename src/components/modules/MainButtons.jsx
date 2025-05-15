import React from "react";

import { e2p } from "utils/replaceNumber";
import PriceInputs from "./PriceInputs";

import styles from "./MainButtons.module.css";

function MainButtons({
  setQuery,
  checkBox,
  allProducts,
  groupDeleteHandler,
  groupDelete,
  addHandler,
  quitHandler,
  setShowDeleteModal,
}) {
  return (
    <>
      <div className={styles.titleRight}>
        <img src="./setting-3.svg" alt="مدیریت کالا" />
        <p>مدیریت کالا</p>
      </div>
      <div className={styles.titleLeft}>
        <PriceInputs setQuery={setQuery} allProducts={allProducts} />
        {!groupDelete.length ? (
          <button className={styles.deleteButton} onClick={groupDeleteHandler}>
            حذف گروهی
          </button>
        ) : (
          <button
            className={styles.deleteCounter}
            onClick={() => setShowDeleteModal(true)}
          >
            حذف ({e2p(groupDelete.length)})
          </button>
        )}
        {checkBox && (
          <button className={styles.quit} onClick={quitHandler}>
            انصراف
          </button>
        )}
        <button className={styles.addButton} onClick={addHandler}>
          افزودن محصول
        </button>
      </div>
    </>
  );
}

export default MainButtons;
