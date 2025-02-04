import React from "react";
import { StarIcon } from "lucide-react";
interface CardProps {
  index: number;
  path: string;
  title: string;
  vote: number;
}

export const Card: React.FC<CardProps> = ({ index, path, title, vote }) => {
  return (
    <div
      key={index}
      className="group w-[157.5px] overflow-hidden  bg-secondary space-y-1 lg:w-[230px] bg-[#71717A] bg-opacity-[0.3] hover:bg-[#71717A] transition-all duration-300 ease-in-out rounded-[10px]  "
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${path}`}
        className="overflow-hidden relative w-[157.5px] h-[234px] lg:w-[230px] lg:h-[340px]"
      />
      <div className="flex items-center justify-start gap-2  px-2">
        <StarIcon color="#FDE047" height={16} width={16} />
        <span>{vote}</span>
      </div>
      <h1 className="h-14 overflow-hidden text-ellipsis line-clamp-2 text-lg text-foreground px-2">
        {title}
      </h1>
    </div>
  );
};
