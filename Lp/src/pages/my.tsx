import { useEffect, useState } from "react";
import { getMe } from "../apis/auth";
import type { Profile } from "../types/users";

export default function MyPage() {
  const [myInfo, setMyInfo] = useState<Profile>();
  useEffect(() => {
    const getData = async () => {
      const { data } = await getMe();
      setMyInfo(data);
      console.log(data);
    };
    getData();
  }, []);

  return <div className="w-full h-full text-white">{myInfo?.name}님</div>;
}
