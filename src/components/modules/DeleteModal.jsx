import styles from "./DeleteModal.module.css";

function DeleteModal({ count, confirmHandler, setShowDeleteModal }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src="./Close.png" alt="delete logo" />
        <p>شما در حال حذف {count} کالا هستید ، آیا مطمئنید ؟</p>
        <div className={styles.buttons}>
          <button onClick={confirmHandler}>حذف</button>
          <button onClick={() => setShowDeleteModal(false)}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
