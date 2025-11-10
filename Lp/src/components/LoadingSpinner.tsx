export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="size-12 animate-spin rounded-full border-6
            border-t-transparent border-[#F56156]"
        role="status"
      >
        <span className="sr-only">로딩중...</span>
      </div>
    </div>
  );
};
