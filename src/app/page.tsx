"use client";
import React from "react";
import Upcoming from "@/components/Upcoming";
import NowPlaying from "@/components/NowPlaying";
import Popular from "@/components/Popular";
import TopRated from "@/components/TopRated";
export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <NowPlaying />
      <div className="flex flex-col gap-10 items-center">
        <Upcoming />
        <Popular />
        <TopRated />
      </div>
    </div>
  );
}
