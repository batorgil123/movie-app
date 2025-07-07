"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/Card";

const GenreDetailPage = () => {
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const params = useParams();
  const { push } = useRouter();

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!params.id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/discover/movie?with_genres=${params.id}&language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies for this genre.");
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesByGenre();
  }, [params.id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Movies in this Genre</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {movies.length === 0 ? (
          <p>No movies found for this genre.</p>
        ) : (
          movies.map((movie) => (
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
    </div>
  );
};

export default GenreDetailPage; 