import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
    const navigate=useNavigate();
    return (
        <div className="w-full flex flex-col items-center justify-center relative text-xl gap-8">
            <button
                className="absolute left-1 top-0 text-2xl cursor-pointer flex justify-center leading-none"
                onClick={() => navigate(-1)}>
                &lt;
            </button>
            <p className="">{title}</p>
        </div>
    );
}
