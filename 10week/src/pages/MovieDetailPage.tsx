import { useParams } from "react-router-dom"

export default function MovieDetailPage() {
    const { id } = useParams<{ id: string }>()
    return(
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50">
            <div className="text-xl text-gray-600 mt-4 sm:text-5xl"> Movie Detail Page</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6">{id}번 영화 상세 페이지를 페칭해옵니다.</h1>
        </div>
        
    )
}