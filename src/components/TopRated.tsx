"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import Link from "next/link";
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
    <div className="flex flex-col gap-4 p-4  max-w-[85%] ">
      <div className="flex justify-between items-center">
        <p className="text-foreground text-2xl font-semibold">Top Rated</p>
        <Link href={`/category/toprated`}>
          <Button>See More</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 lg:gap-8 justify-center max-w-[70%]">
        {TopRatedMoviesData.slice(0, 10).map((element, index) => (
          <Card
            key={index}
            index={index}
            path={element.poster_path}
            vote={element.vote_average}
            title={element.title}
          />
        ))}
      </div>
    </div>
  );
}
