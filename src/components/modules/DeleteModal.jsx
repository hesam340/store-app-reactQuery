import styles from "./DeleteModal.module.css";

function DeleteModal({
  count,
  confirmHandler,
  setShowDeleteModal,
  setShowExitModal,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src="./Close.png" alt="delete logo" />
        {setShowExitModal ? (
          <p>شما در حال خروج از حساب کاربری خود هستید آیا اطمینان دارید؟</p>
        ) : (
          <p>شما در حال حذف {count} کالا هستید ، آیا مطمئنید ؟</p>
        )}

        <div className={styles.buttons}>
          {setShowExitModal ? (
            <>
              <button onClick={confirmHandler}>خروج</button>
              <button onClick={() => setShowExitModal(false)}>لغو</button>
            </>
          ) : (
            <>
              <button onClick={confirmHandler}>حذف</button>
              <button onClick={() => setShowDeleteModal(false)}>لغو</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
