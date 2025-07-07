"use client";
import React from "react";
import Genre from "@/components/fetchgenres";

const GenrePage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Genres</h1>
      <Genre />
    </div>
  );
};

export default GenrePage;
