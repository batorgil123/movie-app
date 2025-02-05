"use client";
import React from "react";
import NowPlaying from "@/components/NowPlaying";
import Popular from "@/components/Popular";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4 ">
      <NowPlaying />
      <div className="flex flex-col gap-10 items-center  justify-center">
        <Popular title="Upcoming" id="upcoming" />
        <Popular title="Popular" id="popular" />
        <Popular title="Top rated" id="top_rated" /> 
      </div>
    </div>
  );
}
