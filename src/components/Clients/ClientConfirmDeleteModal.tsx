import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../Modal/Modal";

interface ClientConfirmDeleteModalProps {
  deleteModal: any;
  setShowDeleteModal: any;
}

const ClientConfirmDeleteModal: React.FC<ClientConfirmDeleteModalProps> = ({
  deleteModal,
  setShowDeleteModal,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (newNote: Note) => deleteModal();
  return (
    <Modal closeModal={setShowDeleteModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[300px] h-[150px] mt-10"
      >
        <div>
          <h3 className="font-semibold text-[18px] text-center">
            Are you sure that you want to delete?
          </h3>
        </div>

        <button
          type="submit"
          className="w-full hover:brightness-75 text-white font-semibold text-[18px] h-[40px] rounded-md bg-red-600"
        >
          {" "}
          Delete{" "}
        </button>
      </form>
    </Modal>
  );
};
export default ClientConfirmDeleteModal;
