"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type GenreType = {
  id: number;
  name: string;
};

interface GenreProps {
  onGenreClick?: () => void;
}

const Genre: React.FC<GenreProps> = ({ onGenreClick }) => {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [loading, setLoading] = useState(true);
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const { push } = useRouter();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get<{ genres: GenreType[] }>(
          `${TMDB_BASE_URL}/genre/movie/list?language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, [TMDB_API_TOKEN, TMDB_BASE_URL]);

  const handleGenreClick = (genreId: number) => {
    // Call the callback to close the menu
    if (onGenreClick) {
      onGenreClick();
    }
    // Navigate to the genre page
    push(`/genre/${genreId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className="px-4 py-2 bg-blue-600 rounded-full text-sm hover:bg-blue-700 transition"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default Genre;
