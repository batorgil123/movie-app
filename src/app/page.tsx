"use client";
import React from "react";
import NowPlaying from "@/components/NowPlaying";
import Movies from "@/components/Movies";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4 ">
      <NowPlaying />
      <div className="flex flex-col gap-10 items-center  justify-center">
        <Movies title="Upcoming" id="upcoming" slc={10}/>
        <Movies title="Popular" id="popular" slc={10}/>
        <Movies title="Top rated" id="top_rated" slc={10}/> 
      </div>
    </div>
  );
}
