import AddModal from "components/templates/AddModal";
import DeleteModal from "./DeleteModal";
import { e2p } from "utils/replaceNumber";
import { useGroupDeleteProducts } from "hooks/mutations";

import styles from "./Actions.module.css";
import { useState } from "react";
import PriceInputs from "./PriceInputs";

function Actions({
  setCheckBox,
  setGroupDelete,
  groupDelete,
  checkBox,
  setQuery,
  allProducts,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);

  const { mutate } = useGroupDeleteProducts();

  const confirmHandler = () => {
    mutate(groupDelete);
    setGroupDelete([]);
    setShowDeleteModal(false);
    setCheckBox(false);
  };

  const quitHandler = () => {
    setCheckBox(false);
    setGroupDelete([]);
  };

  return (
    <div className={styles.actions}>
      <div className={styles.titleRight}>
        <img src="./setting-3.svg" alt="مدیریت کالا" />
        <p>مدیریت کالا</p>
      </div>
      <div className={styles.titleLeft}>
        {!showPriceRange ? (
          <button
            className={styles.priceBaseButton}
            onClick={() => setShowPriceRange(true)}
          >
            فیلتر بر اساس قیمت
          </button>
        ) : (
          <PriceInputs
            setShowPriceRange={setShowPriceRange}
            setQuery={setQuery}
            allProducts={allProducts}
          />
        )}
        {!groupDelete.length ? (
          <button
            className={styles.deleteButton}
            onClick={() => setCheckBox(true)}
          >
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
        <button
          className={styles.addButton}
          onClick={() => setShowAddModal(true)}
        >
          افزودن محصول
        </button>
      </div>
      {showAddModal && <AddModal setShowAddModal={setShowAddModal} />}
      {showDeleteModal && (
        <DeleteModal
          count={e2p(groupDelete.length)}
          confirmHandler={confirmHandler}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
}

export default Actions;
