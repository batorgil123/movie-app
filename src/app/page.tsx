"use client";
import React, { useState, useEffect } from "react";
import NowPlaying from "@/components/NowPlaying";
import Movies from "@/components/Movies";
import { FullPageSkeleton } from "@/components/ui/skeleton";
import { useLoading } from "@/components/loading-context";

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (localLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8 p-4 ">
      <NowPlaying />
      <div className="flex flex-col gap-10 items-center  justify-center">
        <Movies title="Upcoming" id="upcoming" slc={10} seemore/>
        <Movies title="Popular" id="popular" slc={10}  seemore/> 
        <Movies title="Top rated" id="top_rated" slc={10}   seemore/> 
      </div>
    </div>
  );
}
