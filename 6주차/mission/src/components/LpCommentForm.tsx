const LpCommentForm = () => {
  return (
    <form className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="댓글을 남겨주세요"
          className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-600 cursor-pointer"
        >
          작성
        </button>
      </div>
    </form>
  );
};

export default LpCommentForm;