"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Upcoming from "@/components/Upcoming";
import { useState, useEffect } from "react";
import ImageSlider from "@/components/ImageSlider";


const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [popularMoviesData, setPopularMoviesData] = useState([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
     
      
      setPopularMoviesData(response.data.results);
      console.log(popularMoviesData);
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message);
      }
    }
  };
  // console.log("this is error ", error);
  // console.log("this is data ", popularMoviesData);

  useEffect(() => {
    getMovieData();
  }, []);
  return <div className="h-screen mt-[59px]">
    {/* <ImageSlider images={} /> */}
  </div>;
}
