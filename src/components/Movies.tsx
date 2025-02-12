"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { useRouter } from "next/navigation";

interface MoviesProps {
  id: string;
  title: string;
  slc: number;
}

export default function Movies({ id, title, slc }: MoviesProps) {
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const { push } = useRouter();
  const { replace } = useRouter();
  const getMovieData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      setMoviesData(response.data.results);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  console.log(moviesData);
  useEffect(() => {
    if (id) {
      getMovieData();
    }
  }, [id]);

  const formatTitle = (str: string) => {
    return str.replace(/_/, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
      <div className="flex justify-between items-center max-w-[1280px] px-6 w-full">
        <p className="text-foreground text-2xl font-semibold">
          {formatTitle(title)}
        </p>

        <Button
          onClick={() => push(`category/${id}`)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          See More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center max-w-[1280px]">
        {moviesData.slice(0, slc).map((movie: Movie) => (
          <Card
            key={movie.id}
            index={movie.id}
            path={movie.poster_path}
            vote={movie.vote_average}
            title={movie.title}
            onclick={() => replace(`/detail/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
