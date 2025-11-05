import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// 아이콘들
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <>
      {/* ✅ 사이드바 본체 */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        {/* 닫기 버튼 (모바일 전용) */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white md:hidden"
          aria-label="사이드바 닫기"
        >
          ✕
        </button>

        <div className="flex flex-col h-full pt-16">
          <nav className="flex-1 px-2 py-4 space-y-2">
            {/* 홈 */}
            <Link
              to="/"
              onClick={toggleSidebar}
              className="flex items-center space-x-3 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <HomeIcon />
              <span>홈 (목록)</span>
            </Link>

            {/* 검색 */}
            <Link
              to="/search"
              onClick={toggleSidebar}
              className="flex items-center space-x-3 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <SearchIcon />
              <span>검색</span>
            </Link>

            {/* 마이 페이지 */}
            <Link
              to="/my"
              onClick={toggleSidebar}
              className="flex items-center space-x-3 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <UserIcon />
              <span>마이 페이지</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* ✅ 모바일 전용 배경 오버레이 */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-30 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
