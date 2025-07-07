"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/Card";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
        const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
        const response = await axios.get(
          `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      {loading && <div className="text-center py-10">Loading...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}
      {!loading && !error && (
        <div className="flex flex-wrap gap-5 justify-center">
          {movies.length === 0 ? (
            <p>No movies found for this search.</p>
          ) : (
            movies.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                index={movie.id}
                path={movie.poster_path}
                vote={movie.vote_average}
                onclick={() => router.push(`/detail/${movie.id}`)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage; 