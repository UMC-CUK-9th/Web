import { NavLink } from "react-router-dom";

const LINKS = [
    { to: "/", label: "홈" },
    // 💡 경로를 'movies'에서 'movie'로 수정하여 라우터 및 API 경로와 일치시킵니다.
    { to: "/movie/popular", label: "인기 영화" },
    { to: "/movie/now_playing", label: "상영 중" },
    { to: "/movie/top_rated", label: "평점 높은 영화" },
    { to: "/movie/upcoming", label: "개봉 예정" },
];

export const Navbar = (): JSX.Element => {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4">
            {LINKS.map(({ to, label }): JSX.Element => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }): string => {
                        return isActive
                            ? "text-lg text-[#b2dab1] font-bold"
                            : "text-lg text-gray-500 hover:text-gray-800";
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};
