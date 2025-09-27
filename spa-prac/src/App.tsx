import { useEffect, useState } from "react";

function First() {
  return <p>동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세</p>;
}
function Second() {
  return <p>남산 위에 저 소나무 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세</p>;
}
function Third() {
  return <p>가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세</p>;
}
function Fourth() {
  return <p>이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세</p>;
}


export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  // popstate 
  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // pushState + path
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };


  const renderPage = () => {
    switch (path) {
      case "/":
        return <First />;
      case "/second":
        return <Second />;
      case "/third":
        return <Third />;
      case "/fourth":
        return <Fourth />;
      default:
        return <h2>404 Not Found</h2>;
    }
  };

  return (
    <div>
      <h1>SPA 실습</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => navigate("/")}>애국가 1절</button>
        <button onClick={() => navigate("/second")}>애국가 2절</button>
        <button onClick={() => navigate("/third")}>애국가 3절</button>
        <button onClick={() => navigate("/fourth")}>애국가 4절</button>
      </nav>
      {renderPage()}
    </div>
  );
}
