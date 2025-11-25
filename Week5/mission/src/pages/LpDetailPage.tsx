import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Calendar, Edit, Trash2, AlertTriangle, MessageSquare} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import type { PaginationDto } from "../types/common";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import CommentForm from "../components/comment/commentForm";
import CommentItem from "../components/comment/commentItem";
import { CommentSkeletonList } from "../components/comment/commentSkeleton";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import ConfirmModal from "../components/ConfirmModal";
import LpCreateModal from "../components/Lp/LpCreateModal";


const formatDate = (dateString: Date) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Error");
    }
    return date.toLocaleDateString("ko-KR", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.');
  } catch (e) {
    console.error("오류:", e, dateString);
    return "정보 없음";
  }
};


const LpDetailPage = () => {
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const numericLpId = Number(lpId);



const {
  data: lpResponse,
isPending,
       isError, refetch
    } = useGetLpDetail({lpId: Number(lpId)});



const { data:meResponse } = useGetMyInfo(accessToken);
const { mutate: likeMutate } = usePostLike();
const { mutate: disLikeMutate } = useDeleteLike();


  const { mutate: deleteLpMutate, isPending: isDeletingLp } = useDeleteLp();
  

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const lp = lpResponse?.data;
    const me = meResponse?.data;


    const isLiked = lp?.likes.some((like) => like.userId === me?.id);
    const likesCount = lp?.likes.length ?? 0;
    const formattedDate = lp ? formatDate(lp.createdAt) : "";
    const isAuthor = lp?.authorId === me?.id;

    const [commentOrder, setCommentOrder] = useState<PaginationDto['order']>(PAGINATION_ORDER.desc);
    const { ref: commentIntersectRef, inView } = useInView({ threshold: 0.5 });
    
    const {
      data: commentsData,
      isPending: isCommentsPending,
      isError: isCommentsError,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      refetch: refetchComments
    } = useGetInfiniteLpComments(numericLpId, 10, commentOrder);

    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

const handleLikeLp = () => {
      if (!accessToken) {
        alert("로그인 필요"); 
        navigate("/login");
        return;
      }
      likeMutate({lpId: numericLpId});
    };

const handleDislikeLp = () => {
      if (!accessToken) {
         alert("로그인 필요"); 
         navigate("/login");
         return;
      }
      disLikeMutate({lpId: numericLpId});
    };


    const handleDeleteLp = () => {
    deleteLpMutate({ lpId: numericLpId });
  };

  if (isPending) {
      return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 animate-pulse min-h-screen">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex justify-between items-center mb-6">
             <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
          <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-red-500 mb-4">
            오류
          </h3>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            재시도
          </button>
        </div>
      );
    }


  return (
    <>
  <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          {lp?.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart size={16} />
            <span>{likesCount} LIKES</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={isLiked ? handleDislikeLp : handleLikeLp}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${
              isLiked
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Heart
              size={18}
              fill={isLiked ? "currentColor" : "transparent"}
            />
            <span className="font-semibold">{isLiked ? "LIKED" : "LIKE"}</span>
          </button>


          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
              onClick={() => setIsUpdateModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
              >
                <Edit size={16} />
                수정
              </button>
              <button
              onClick={() => setIsDeleteModalOpen(true)} 
              disabled={isDeletingLp} 
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                삭제
              </button>
            </div>
          )}
        </div>
        
        <div className="w-full min-h-[400px] bg-slate-50 rounded-lg mb-8 flex items-center justify-center">
        <img
          src={lp?.thumbnail}
          alt={lp?.title}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg mb-8 bg-slate-100"
        />
        </div>

        <div className="prose max-w-none text-slate-800">
          <p>{lp?.content}</p>
        </div>

      {lp?.tags && lp.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">태그</h3>
            <div className="flex flex-wrap gap-2">
              {lp.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  # {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>





        <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg mt-6">
          <div className="flex items-center gap-2 mb-6">
             <MessageSquare className="text-slate-800" />
             <h2 className="text-2xl font-bold text-slate-800">댓글</h2>
          </div>


          <div className="mb-8">
            <CommentForm lpId={numericLpId} />
          </div>

          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setCommentOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 text-sm rounded-full ${
                commentOrder === PAGINATION_ORDER.desc
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setCommentOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 text-sm rounded-full ${
                commentOrder === PAGINATION_ORDER.asc
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              오래된순
            </button>
          </div>


          <div>

            {isCommentsPending && (
              <CommentSkeletonList count={5} />
            )}
            

            {isCommentsError && (
              <div className="flex flex-col items-center justify-center text-center p-6">
                <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
                <p className="text-red-500 mb-4">댓글을 불러오지 못했습니다.</p>
                <button
                  onClick={() => refetchComments()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  재시도
                </button>
              </div>
            )}
            

            {commentsData?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.data.data.map((comment) => (

                  <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    lpId={numericLpId} 
                  />
                ))}
              </div>
            ))}
            

            {isFetchingNextPage && (
              <CommentSkeletonList count={3} />
            )}
            

            <div ref={commentIntersectRef} className="h-2" />
          </div>
        </div>

        <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLp}
        isPending={isDeletingLp}
        title="LP 삭제"
        message="삭제"
        confirmText="삭제하기"
      />

      {lp && (
        <LpCreateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          lpToEdit={lp}
        />
      )}
</>
      

      

      

  );
};

export default LpDetailPage;
