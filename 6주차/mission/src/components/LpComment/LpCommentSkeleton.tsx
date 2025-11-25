const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="w-1/4 h-4 bg-gray-700 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;