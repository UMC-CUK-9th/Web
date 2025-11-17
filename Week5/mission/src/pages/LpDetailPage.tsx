import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart, Calendar, Edit, Trash2, AlertTriangle} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";


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



const {
  data: lpResponse,
isPending,
       isError, refetch
    } = useGetLpDetail({lpId: Number(lpId)});

const { data:meResponse } = useGetMyInfo(accessToken);
const { mutate: likeMutate } = usePostLike();
const { mutate: disLikeMutate } = useDeleteLike();

    const lp = lpResponse?.data;
    const me = meResponse?.data;


    const isLiked = lp?.likes.some((like) => like.userId === me?.id);
    const likesCount = lp?.likes.length ?? 0;
    const formattedDate = lp ? formatDate(lp.createdAt) : "";
    const isAuthor = lp?.authorId === me?.id;

const handleLikeLp = () => {
      if (!accessToken) {
        alert("로그인 필요"); 
        navigate("/login");
        return;
      }
      likeMutate({lpId:Number(lpId)});
    };

const handleDislikeLp = () => {
      if (!accessToken) {
         alert("로그인 필요"); 
         navigate("/login");
         return;
      }
      disLikeMutate({lpId:Number(lpId)});
    };

  if (isPending) {
      return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 animate-pulse">
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


  return (<div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
              >
                <Edit size={16} />
                수정
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                삭제
              </button>
            </div>
          )}
        </div>

        <img
          src={lp?.thumbnail}
          alt={lp?.title}
          className="w-full h-auto max-h-[500px] object-contain rounded-lg mb-8 bg-slate-100"
        />

        <div className="prose max-w-none text-slate-800">
          <p>{lp?.content}</p>
        </div>
      </div>

  );
};

export default LpDetailPage;
