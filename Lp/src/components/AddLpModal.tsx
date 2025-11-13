import { IoClose } from "react-icons/io5";
import lpImage from "../assets/lpImage.png";
import { useState } from "react";
import usePostLp from "../hooks/mutations/usePostLps";
import { postImage } from "../apis/lps";

export default function AddLpModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [lpTagList, setLpTagList] = useState<string[]>([]);
  const [inputImage, setInputImage] = useState("");

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleAddTag = () => {
    if (!lpTag.trim()) return;
    setLpTagList((prev) => [...prev, lpTag]);
    setLpTag("");
    console.log(lpTagList);
  };

  const handleDeleteTag = (tag: string) => {
    setLpTagList((prev) => prev.filter((t) => t !== tag));
  };
  const { mutate } = usePostLp();
  const handleAddLp = () => {
    const lpData = {
      title: lpName,
      content: lpContent,
      thumbnail: inputImage,
      tags: lpTagList,
      published: true,
    };
    console.log(lpData);
    mutate(lpData, {
      onSuccess: () => {
        setLpName("");
        setLpContent("");
        setInputImage("");
        setLpTag("");
        setLpTagList([]);
        setIsOpen(false);
        alert("등록을 성공했습니다.");
      },
      onError: (error) => {
        console.error("LP등록오류", error);
        alert("등록에 실패했습니다");
      },
    });
  };
  const handleImageClick = () => {
    const clickLp = document.getElementById("imageUpload") as HTMLInputElement;
    clickLp.click();
  };
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { data } = await postImage(file);
      setInputImage(data.imageUrl);
      console.log("inputImage:" + inputImage);
    } catch (e) {
      console.log(e);
    }
  };
  const lpImageSrc = !inputImage ? lpImage : inputImage;

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex w-full h-full items-center justify-center text-white bg-black/50">
          <div className="w-96 bg-[#252525ff] p-5 rounded-lg">
            <div className="w-full flex justify-end">
              <button
                className="text-xl pb-5 cursor-pointer"
                onClick={handleClick}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex items-center justify-center pb-5">
              <img
                src={lpImageSrc}
                alt="lp이미지"
                onClick={handleImageClick}
                className="rounded-full w-60 h-60 cursor-pointer"
              />
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={handleImageFile}
              />
            </div>
            {/*입력*/}
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="LP Name"
                value={lpName}
                onChange={(e) => setLpName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                type="text"
                placeholder="Lp Content"
                value={lpContent}
                onChange={(e) => setLpContent(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Lp tag"
                  value={lpTag}
                  onChange={(e) => setLpTag(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <button
                  className="w-30 bg-gray-500 rounded-md cursor-pointer"
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {lpTagList.map((tag) => (
                  <div className="flex gap-2 border border-white rounded p-2">
                    {tag}
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDeleteTag(tag)}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="mt-5 bg-gray-500 rounded-md w-full h-10 cursor-pointer"
                onClick={handleAddLp}
              >
                Add Lp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
