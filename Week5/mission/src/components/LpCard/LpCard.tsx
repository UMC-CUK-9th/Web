import { useNavigate } from "react-router-dom";
import type { LpItem } from "../../types/lp";
import { Heart, Calendar } from "lucide-react";

interface LpCardProps {
    lp: LpItem;
}

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
const LpCard = ( {lp}:LpCardProps) => {

    const navigate = useNavigate();
    const likesCount = lp.likes.length;
    const formattedDate = formatDate(lp.createdAt);

    return ( 
        <div 
        onClick={()=>navigate(`/lps/${lp.id}`)}
        className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
          <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          />

        <div 
            className="absolute inset-0 bg-black bg-opacity-60 
                       opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 
                       flex flex-col justify-center items-center p-4"
          >

            <h3 className="text-lg font-bold text-white text-center mb-3">
              {lp.title}
            </h3>
            
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <Heart size={16} fill="white" />
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>


        </div>

        );

};

export default LpCard;