// src/pages/MyPage.tsx

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import { Settings, Camera, User } from "lucide-react";

interface UserData {
  id: number;
  email: string;
  name: string;
  bio?: string | null;
  profileImage?: string | null;
}

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [myData, setMyData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // [추가] 탈퇴 확인 모달 상태
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setMyData(response.data);
        setEditName(response.data.name);
        setEditBio(response.data.bio || "");
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // [추가] 회원 탈퇴 핸들러 (기능 없음, 로그만 출력)
  const handleWithdraw = async () => {
    console.log("회원 탈퇴 요청됨! (기능은 아직 없음)");
    alert("탈퇴 기능은 아직 구현되지 않았습니다. UI만 확인하세요!");
    setShowWithdrawConfirm(false); // 모달 닫기
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("저장 버튼 클릭됨! (기능은 아직 없음)");
    alert("저장 기능은 아직 구현되지 않았습니다. UI만 확인하세요!");
    setIsEditing(false);
  };

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (!myData) return <div>정보를 불러올 수 없습니다.</div>;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 min-h-[80vh] relative">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-pink-400 to-purple-500 relative">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
              aria-label="프로필 설정"
            >
              <Settings size={20} />
            </button>
          )}
        </div>

        <div className="px-6 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-center sm:justify-start">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {previewImage || myData.profileImage ? (
                  <img
                    src={previewImage || myData.profileImage || ""}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>

              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-gray-900/60 text-white rounded-full hover:bg-gray-900/80 transition-colors cursor-pointer"
                >
                  <Camera size={18} />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                이메일
              </label>
              <div className="text-lg text-gray-900 dark:text-white font-medium">
                {myData.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {myData.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                한줄 소개
              </label>
              {isEditing ? (
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="나를 표현하는 한마디를 적어보세요."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg h-24 resize-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {myData.bio || "아직 소개가 없습니다."}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
              {isEditing ? (
                <div className="flex justify-end gap-3 w-full">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(myData.name);
                      setEditBio(myData.bio || "");
                      setPreviewImage(null);
                    }}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    저장
                  </button>
                </div>
              ) : (
                // [수정] 로그아웃 버튼 옆에 회원 탈퇴 버튼 추가
                <>
                  <button
                    onClick={() => setShowWithdrawConfirm(true)}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors underline decoration-gray-300 hover:decoration-red-500"
                  >
                    회원 탈퇴
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* [추가] 회원 탈퇴 확인 모달 */}
      {showWithdrawConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 m-4">
            <h2 className="text-lg font-bold text-red-600 dark:text-red-500 mb-4">
              정말 탈퇴하시겠습니까?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              탈퇴 시 작성한 모든 게시물과 댓글, 좋아요 기록이 삭제되며 복구할 수 없습니다.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowWithdrawConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;