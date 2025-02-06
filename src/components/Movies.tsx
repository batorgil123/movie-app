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
  
}

export default function Movies({ id, title }: MoviesProps) {
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
    return str
      .replace(/_/, " ") 
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-[60%]">
      <div className="flex justify-between items-center">
        <p className="text-foreground text-2xl font-semibold">
          {formatTitle(title)}
        </p>

        <Button
          onClick={() => push(`category/${id}`)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
        >
          See More
        </Button>
      </div>
      <div className="flex flex-wrap gap-5 lg:gap-8 justify-center">
        {moviesData.slice(0, 10).map((movie: Movie) => (
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
