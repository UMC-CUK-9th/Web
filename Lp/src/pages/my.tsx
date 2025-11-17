import { useEffect, useState } from "react";
import { getMe } from "../apis/auth";
import type { Profile } from "../types/users";
import profileImage from "../assets/profileImage.png";
import { GoPencil } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";

export default function MyPage() {
  const [myInfo, setMyInfo] = useState<Profile>();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    const getData = async () => {
      const { data } = await getMe();
      setMyInfo(data);
      console.log(data);
    };
    getData();
  }, []);
  const profileSrc = myInfo?.avatar ? myInfo.avatar : profileImage;

  return (
    <div className="w-full h-full text-white flex flex-col items-center p-10 text-white">
      <div className="flex gap-5">
        <img
          src={profileSrc}
          alt={`내 프로필 이미지`}
          className="rounded-full size-40"
        />
        <div className="w-60 p-3 text-xl">
          <div className="flex w-full justify-between items-center pb-2">
            {!edit ? (
              <>
                <p className="text-3xl">{myInfo?.name}님</p>
                <GoPencil onClick={() => setEdit(true)} />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border w-44 text-3xl "
                />
                <FaCheck className="" />
              </>
            )}
          </div>
          {!edit ? (
            <p className="pb-2">{myInfo?.bio}</p>
          ) : (
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border mb-2"
            />
          )}
          <p>{myInfo?.email}</p>
        </div>
      </div>
    </div>
  );
}
