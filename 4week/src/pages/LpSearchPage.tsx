import { useParams } from 'react-router-dom';
// import useGetLpDetail from '../hooks/queries/useGetLpDetail'; // (이 훅은 API 명세에 맞게 새로 만드셔야 합니다)
import type { Lp } from '../types/lp';

// --- 임시: useGetLpDetail 훅이 없으므로, 임시 훅과 데이터를 만듭니다. ---
// 나중에 실제 useGetLpDetail 훅을 만드신 후 이 부분은 제거해주세요.
const useGetLpDetail = (lpId: string | undefined) => {
  console.log("Fetching LP with ID:", lpId);
  // Lp 타입에 맞게 'description', 'tracklist' 등이 있다고 가정합니다.
  const dummyData: Lp | undefined = lpId ? {
    id: parseInt(lpId, 10),
    title: `더미 LP 제목 ${lpId}`,
    artist: "더미 아티스트",
    thumbnail: `https://placehold.co/600x600/333/fff?text=LP+${lpId}`,
    description: "이곳에 LP에 대한 자세한 설명이 들어갑니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    releasedDate: "2024-01-01",
    tracklist: [
      { id: 1, title: "트랙 1" },
      { id: 2, title: "트랙 2" },
      { id: 3, title: "트랙 3" },
      { id: 4, title: "트랙 4" },
      { id: 5, title: "트랙 5" },
    ]
  } : undefined;

  return { data: dummyData, isPending: false, isError: false };
};
// --- 임시 코드 끝 ---


const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>(); // URL에서 :lpId 값을 가져옵니다.

  // LP ID로 상세 데이터를 가져오는 훅 (API 명세에 맞게 새로 만드셔야 합니다)
  const { data: lp, isPending, isError } = useGetLpDetail(lpId);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching LP details.</div>;
  if (!lp) return <div>LP not found.</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* LP 썸네일 */}
        <div className="md:w-1/2">
          <img 
            src={lp.thumbnail} 
            alt={lp.title} 
            className="w-full aspect-square rounded-lg shadow-xl object-cover"
          />
        </div>

        {/* LP 정보 */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{lp.title}</h1>
          <h2 className="text-xl text-gray-700 mt-2">{lp.artist}</h2>
          <p className="text-gray-600 mt-1">발매일: {lp.releasedDate}</p>

          <p className="text-gray-800 mt-6 whitespace-pre-wrap">
            {lp.description}
          </p>

          {/* 트랙리스트 */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">트랙리스트</h3>
            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              {lp.tracklist?.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;