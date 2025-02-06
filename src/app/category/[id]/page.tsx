"use client";

import React from "react";
import { useParams } from "next/navigation";
import Movies from "@/components/Movies";
const CategoryPage = () => {
  const params = useParams();

  return (
    <div className="flex flex-col gap-10 items-center  justify-center">
      <Movies id={params.id as string} title={params.id as string} />
    </div>
  );
};

export default CategoryPage;
