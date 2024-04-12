import { FaXmark } from "react-icons/fa6";

const Modal: React.FC<any> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed w-auto h-auto p-10 bg-white rounded-[30px]">
        <button
          onClick={() => closeModal(false)}
          className="absolute top-10 right-10 rounded-[60px] hover:bg-gray-300 p-2"
        >
          <FaXmark size={25} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
