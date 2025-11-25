import { useNavigate } from "react-router-dom";
import useDeleteUsers from "../hooks/mutations/useDeleteUsers";

export default function DeleteModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const { mutate } = useDeleteUsers();
  const handleDeleteUser = () => {
    mutate();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex w-full h-full items-center justify-center text-white bg-black/50 z-10">
          <div className="w-96 bg-[#252525ff] p-5 rounded-lg h-50 flex justify-center items-center flex-col gap-10">
            <p>정말 탈퇴하시겠습니까? </p>
            <div className="w-50 flex justify-between">
              <button
                className="p-2 bg-gray-500 rounded-md w-20 cursor-pointer"
                onClick={() => handleDeleteUser()}
              >
                예
              </button>
              <button
                className="p-2 bg-pink-500 rounded-md w-20 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
