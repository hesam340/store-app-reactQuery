import { toast } from "react-toastify";
import { useState } from "react";

import { useGroupDeleteProducts } from "hooks/mutations";
import MainButtons from "components/modules/MainButtons";
import DeleteModal from "components/modules/DeleteModal";
import AddModal from "components/modules/AddModal";
import { useUser } from "context/UserContext";
import { e2p } from "utils/replaceNumber";

import styles from "./Actions.module.css";

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
  const { user } = useUser();

  const { mutate } = useGroupDeleteProducts();

  const groupDeleteHandler = () => {
    if (user.token) {
      setCheckBox(true);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const addHandler = () => {
    if (user.token) {
      setShowAddModal(true);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

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
      <MainButtons
        checkBox={checkBox}
        allProducts={allProducts}
        setQuery={setQuery}
        groupDelete={groupDelete}
        groupDeleteHandler={groupDeleteHandler}
        addHandler={addHandler}
        quitHandler={quitHandler}
        setShowDeleteModal={setShowDeleteModal}
      />
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
