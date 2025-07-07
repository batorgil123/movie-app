import React from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";

interface CardProps {
  index: number;
  path: string;
  title: string;
  vote: number;
  onclick?: () => void;
}

export const Card: React.FC<CardProps> = ({ index, path, title, vote, onclick }) => {
  return (
    <div
      key={index}
      className="group w-[180px] h-[300px] lg:w-[230px] lg:h-[340px] overflow-hidden bg-secondary space-y-1 bg-[#71717A] bg-opacity-[0.3] hover:bg-[#71717A] transition-all duration-300 ease-in-out rounded-[10px] cursor-pointer flex flex-col"
      onClick={onclick}
    >
      <div className="relative w-full h-[220px] lg:h-[280px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${path}`}
          alt={title}
          fill
          className="rounded-lg shadow-lg object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-start gap-2 px-2 mt-2">
        <StarIcon color="#FDE047" height={16} width={16} />
        <span>{vote}</span>
      </div>
      <h1 className="h-12 overflow-hidden text-ellipsis line-clamp-2 text-base lg:text-lg text-foreground px-2">
        {title}
      </h1>
    </div>
  );
};
