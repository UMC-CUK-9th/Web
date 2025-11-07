interface ErrorFallbackProps {
  message?: string;
  error?: unknown;
  onRetry?: () => void;
}

const ErrorFallback = ({ message, error, onRetry }: ErrorFallbackProps) => {
  let errorMessage = "";

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object") {
    errorMessage = JSON.stringify(error);
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 text-red-500 gap-3">
      <p>
        {message || "데이터를 불러오는 중 오류가 발생했습니다"}
      </p>

      {errorMessage && (
        <p className="text-sm text-gray-500">{errorMessage}</p>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
