import AddModal from "components/templates/AddModal";
import { useEditProduct } from "hooks/mutations";

function EditModal({ id, setShowEditModal, product }) {
  const { mutate } = useEditProduct();

  return (
    <AddModal
      id={id}
      mutate={mutate}
      setShowEditModal={setShowEditModal}
      product={product}
    />
  );
}

export default EditModal;
