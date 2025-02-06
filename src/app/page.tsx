"use client";
import React from "react";
import NowPlaying from "@/components/NowPlaying";
import Movies from "@/components/Movies";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4 ">
      <NowPlaying />
      <div className="flex flex-col gap-10 items-center  justify-center">
        <Movies title="Upcoming" id="upcoming" />
        <Movies title="Popular" id="popular" />
        <Movies title="Top rated" id="top_rated" /> 
      </div>
    </div>
  );
}
