export const LoadingSpinner=()=>{
    return (
        <div className="fixed inset-0 h-screen flex items-center justify-center">
            <div className="size-12 animate-spin rounded-full border-6 border-t-transparent border-[#b2dab1]"role='status'>
                <span className="sr-only">로딩중...</span>
            </div>
        </div>
    );
};