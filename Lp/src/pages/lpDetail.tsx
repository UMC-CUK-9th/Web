import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { lpDetail } from "../types/lps";
import { getLpDetail } from "../apis/lps";
import { FaHeart } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

export default function LpDetailPage() {
  const params = useParams();
  const lpId = Number(params.id);
  const [detail, setDetail] = useState<lpDetail>();
  useEffect(() => {
    const getData = async () => {
      const { data } = await getLpDetail(lpId);
      console.log("이거출력해줘..", data);
      setDetail(data);
    };
    getData();
  }, [lpId]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center text-white p-10">
      <div className="bg-[#252525ff] rounded-lg w-[80%] flex flex-col items-center p-3 gap-5">
        {/*작성자이름*/}
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src={detail?.author.avatar}
              className="w-10 h-10 rounded-full"
              alt={"구글로고"}
            />
            <p className="text-lg">{detail?.author.name}</p>
          </div>
          <p>{detail?.createdAt.slice(0, 10)}</p>
        </div>

        {/*Lp이름*/}
        <div className="w-full flex justify-between">
          <p>{detail?.title}</p>
          <div className="flex gap-3 items-center">
            <GoPencil />
            <FaRegTrashAlt />
          </div>
        </div>

        {/*Lp 사진*/}
        <div className="flex items-center justify-center size-80 shadow-lg shadow-black">
          <img
            src={detail?.thumbnail}
            className="w-50 h-50 object-cover rounded-full"
          />
        </div>

        <p>{detail?.content}</p>

        <div className="flex bg-gray-900 p-2 rounded-lg">
          <p># 태그</p>
        </div>

        <div className="flex items-center gap-3">
          <FaHeart />
          <p>{detail?.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
