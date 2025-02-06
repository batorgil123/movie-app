"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MovieDataType } from "@/components/moviedatatype";

const Page = () => {
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<MovieDataType | null>(null);
  const params = useParams();

  const getMovieData = async () => {
    if (!params.id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${params.id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      setMovieData(response.data);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getMovieData();
    }
  }, [params.id]);

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

  if (!movieData) {
    return <div className="text-center py-10">No movie data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="flex-grow md:w-2/3">
            <h1 className="text-4xl font-extrabold text-white mb-4">{movieData.title}</h1>
            <div className="space-y-2 mb-6">
              <p className="text-gray-400">Release Date: {movieData.release_date}</p>
              <p className="text-gray-400">Rating: {movieData.vote_average} / 10</p>
              <p className="text-gray-400">Runtime: {movieData.runtime} minutes</p>
              <p className="text-gray-400">
                Genres: {movieData.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <p className="text-lg text-gray-300 mb-6">{movieData.overview}</p>
            <div className="mt-6">
              <a
                href={`https://www.themoviedb.org/movie/${movieData.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                View on TMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
