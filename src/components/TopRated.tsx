"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/types";
import { Button } from "@/components/ui/button";

export default function TopRated() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [TopRatedMoviesData, setTopRatedMoviesData] = useState<Movie[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setTopRatedMoviesData(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message);
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Top Rated</p>
        <Button>See More</Button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {TopRatedMoviesData.map((element, index) => (
          <div key={index} className="flex flex-col gap-2 bg-gray-900 p-4 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`}
              alt={element.title}
              className="rounded-lg w-full h-[300px] object-cover"
            />
            <h1 className="text-lg font-bold text-white">{element.title}</h1>
            <p className="text-gray-400 line-clamp-3 text-sm">{element.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
