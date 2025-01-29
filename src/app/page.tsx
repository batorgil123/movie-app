"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import  Upcoming  from "@/components/Upcoming";
// import { useState } from "react";
// const [movies, setMovies] = useState({})
export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen bg-slate-400 ">


      
       <Upcoming/>
    </div>
  );
}
