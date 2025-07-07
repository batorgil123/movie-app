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
  seemore: boolean;
}

export default function Movies({ id, title, slc, seemore }: MoviesProps) {
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

  const [loading, setLoading] = useState(false);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { push, replace } = useRouter();

  useEffect(() => {
    if (id) {
      const getMovieData = async (page: number) => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${TMDB_BASE_URL}/movie/${id}?language=en-US&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
              },
            }
          );
          setMoviesData(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error("Failed to fetch data", error);
        } finally {
          setLoading(false);
        }
      };
      getMovieData(currentPage);
    }
  }, [id, currentPage, TMDB_BASE_URL, TMDB_API_TOKEN]);

  const formatTitle = (str: string) => {
    return str.replace(/_/, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 p-4 w-full items-center justify-center">
      <div className="flex justify-between items-center max-w-[1280px] px-6 w-full">
        <p className="text-foreground text-2xl font-semibold">
          {formatTitle(title)}
        </p>
        {seemore && (
          <button
            onClick={() => push(`category/${id}`)}
            className="border-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
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
          </button>
        )}
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

      {seemore !== true && (
        <div className="flex justify-center items-center gap-4 mt-6">
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
      )}
    </div>
  );
}
