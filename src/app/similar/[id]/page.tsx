"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { useRouter, useParams } from "next/navigation";

export default function Similar() {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { push, replace } = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const getSimilarMovies = async (page: number) => {
    if (!params.id) return;
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${params.id}/similar?language=en-US&page=${page}`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      setMoviesData(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      setError("Error fetching similar movies");
      console.error("Error fetching similar movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getSimilarMovies(currentPage);
    }
  }, [params.id, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full flex justify-center flex-col items-center gap-4">
      <div className="flex flex-col gap-4 p-4 max-w-[60%]">
        <div className="flex justify-between items-center">
          <p className="text-foreground text-2xl font-semibold">
            Similar Movies
          </p>
        </div>

        <div className="flex flex-wrap gap-5 lg:gap-8 justify-center">
          {moviesData.map((movie: Movie) => (
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
      <div className="flex justify-center items-center gap-4 my-8">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-[7px] disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-[7px] disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
