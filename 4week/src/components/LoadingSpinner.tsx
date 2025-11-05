// Tailwind CSS로 만든 간단한 스피너
const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}
        style={{ borderTopColor: "transparent" }} // 이중 보장
      ></div>
    </div>
  );
};

export default LoadingSpinner;
