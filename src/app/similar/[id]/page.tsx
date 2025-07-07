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
  const { push } = useRouter();
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
      setMoviesData(response.data.results as Movie[]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, currentPage, TMDB_BASE_URL, TMDB_API_TOKEN]);

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
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Similar Movies</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {moviesData.length === 0 ? (
          <p>No similar movies found.</p>
        ) : (
          moviesData.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              index={movie.id}
              path={movie.poster_path}
              vote={movie.vote_average}
              onclick={() => push(`/detail/${movie.id}`)}
            />
          ))
        )}
      </div>
      <div className="flex justify-center mt-8 gap-2">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
