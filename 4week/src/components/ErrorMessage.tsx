type ErrorMessageProps = {
  message: string;
  onRetry: () => void; // 재시도 함수
};

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
      role="alert"
    >
      <strong className="font-bold">오류 발생: </strong>
      <span className="block sm:inline">{message}</span>
      <div className="mt-4">
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          재시도
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
