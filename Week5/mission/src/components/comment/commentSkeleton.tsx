const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 items-start p-4 border-b border-gray-100 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};


export const CommentSkeletonList = ({ count }: { count: number }) => {
   return (
     <div className="border-t border-gray-100">
       {new Array(count).fill(0).map((_, idx) => (
         <CommentSkeleton key={idx} />
       ))}
     </div>
   );
};

export default CommentSkeleton;