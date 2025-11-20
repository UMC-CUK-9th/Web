
import { useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { X, Plus, Tag, Link } from 'lucide-react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useCreateLp from '../../hooks/mutations/useCreateLp';
import type { RequestCreateLpDto, LpItem } from '../../types/lp';
import { useUpdateLp } from '../../hooks/mutations/useUpdateLp';

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lpToEdit?: LpItem | null;
}


const lpSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
  thumbnail: z.string().url("유효한 URL을 입력해주세요.").or(z.literal("").nullable()),
  published: z.boolean(),
});

type LpFormFields = z.infer<typeof lpSchema>;

const LpCreateModal = ({ isOpen, onClose, lpToEdit = null, }: LpCreateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(modalRef, onClose);


  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const isEditMode = !!lpToEdit;


const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<LpFormFields>({
    resolver: zodResolver(lpSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      published: true,
    }
  });

  useEffect(() => {
    if (isOpen && isEditMode && lpToEdit) {
      resetForm({
        title: lpToEdit.title,
        content: lpToEdit.content,
        thumbnail: lpToEdit.thumbnail,
        published: lpToEdit.published,
      });
      setTags(lpToEdit.tags.map((tag) => tag.name));
    }
  }, [isOpen, isEditMode, lpToEdit, resetForm]);

  const { mutate: createLp, isPending: isCreating } = useCreateLp();

  
  const { mutate: updateLp, isPending: isUpdating } = useUpdateLp({
    lpId: lpToEdit?.id ?? 0,
  });

  const isPending = isCreating || isUpdating;

const handleClose = () => {
    resetForm({
      title: "",
      content: "",
      thumbnail: "",
      published: true,
    });
    setTagInput("");
    setTags([]);
    onClose();
  };



  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput(""); 
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit: SubmitHandler<LpFormFields> = (data) => {

    if (tags.length === 0) {
      alert("태그를 1개 이상 등록해주세요.");
      return; 
    }


    

    const payload: RequestCreateLpDto = {
      title: data.title,
      content: data.content,
      thumbnail: data.thumbnail === "" ? null : data.thumbnail, 
      
      tags: tags,
      published: data.published,
    };
    



    if (isEditMode) {
      updateLp(payload, {
        onSuccess: handleClose, 
      });
    } else {
      createLp(payload, {
        onSuccess: handleClose, 
      });
    }
  }; 

  if (!isOpen) {
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-40">
      

      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col z-50"
      >

        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold text-slate-800">{isEditMode ? "수정" : "등록"}</h3>
          <button 
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-800"
          >
            <X size={24} />
          </button>
        </div>


        <form 
          id="lp-form"
          onSubmit={handleSubmit(onSubmit)} 
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          
<div>
            <label htmlFor="lp-thumbnail" className="block text-sm font-medium text-slate-700 mb-2">
              이미지 URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Link size={16} className="text-slate-400" />
              </span>
              <input
                type="text"
                id="lp-thumbnail"
                className={`w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2
                  ${errors.thumbnail ? "border-red-500 ring-red-300" : "border-slate-300 focus:ring-indigo-500"}`}
                {...register("thumbnail")}
                disabled={isPending}
              />
            </div>
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>}
          </div>


          <div>
            <label htmlFor="lp-title" className="block text-sm font-medium text-slate-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lp-title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.title ? "border-red-500 ring-red-300" : "border-slate-300 focus:ring-indigo-500"}`}
              {...register("title")}
              disabled={isPending}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>


          <div>
            <label htmlFor="lp-content" className="block text-sm font-medium text-slate-700 mb-2">
              내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="lp-content"
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.content ? "border-red-500 ring-red-300" : "border-slate-300 focus:ring-indigo-500"}`}
              {...register("content")}
              disabled={isPending}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>



          <div>
            <label htmlFor="lp-tags" className="block text-sm font-medium text-slate-700 mb-2">
              태그
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="lp-tags"
                className="flex-1 w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                disabled={isPending}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={isPending}
                className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus size={20} />
              </button>
            </div>
            
  
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  <Tag size={14} />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={isPending}
                    className="ml-1 text-indigo-400 hover:text-indigo-700"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="lp-published"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              {...register("published")}
              disabled={isPending}
            />
            <label htmlFor="lp-published" className="ml-3 block text-sm font-medium text-slate-700">
              공개 여부
            </label>
          </div>

        </form>


        <div className="flex items-center justify-end p-4 border-t gap-3">
          <button 
            onClick={handleClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
            disabled={isPending}
          >
            취소
          </button>
          <button
            type="submit"
            form="lp-form"
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
            disabled={isPending}
          >
            {isPending
              ? isEditMode
                ? "수정 중..."
                : "등록 중..."
              : isEditMode
              ? "수정하기"
              : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpCreateModal;