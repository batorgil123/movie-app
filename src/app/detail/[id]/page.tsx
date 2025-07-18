"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MovieDataType } from "@/components/moviedatatype";
import { Star } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CrewMember = { job: string; name: string };
type CastMember = { name: string };
type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const Page = () => {
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<MovieDataType | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [director, setDirector] = useState<string | null>(null);
  const [writers, setWriters] = useState<string[]>([]);
  const [stars, setStars] = useState<string[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const params = useParams();
  const { push } = useRouter();

  const getMovieData = async () => {
    if (!params.id) return;
    try {
      setLoading(true);
      setError(null);
      const [movieRes, creditsRes, trailerRes] = await Promise.all([
        axios.get(`${TMDB_BASE_URL}/movie/${params.id}?language=en-US`, {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }),
        axios.get(
          `${TMDB_BASE_URL}/movie/${params.id}/credits?language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        ),
        axios.get(`${TMDB_BASE_URL}/movie/${params.id}/videos?language=en-US`, {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }),
      ]);
      setMovieData(movieRes.data);
      const { cast, crew } = creditsRes.data as { cast: CastMember[]; crew: CrewMember[] };
      const director = crew.find((person) => person.job === "Director");
      setDirector(director ? director.name : "Unknown");
      const writers = crew
        .filter((person) => person.job === "Screenplay" || person.job === "Writer")
        .map((writer) => writer.name);
      setWriters(writers);
      const mainStars = cast.slice(0, 3).map((actor) => actor.name);
      setStars(mainStars);
      const videos = trailerRes.data.results as { type: string; site: string; key: string }[];
      const officialTrailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(officialTrailer ? officialTrailer.key : null);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getSimilarMovies = async () => {
    if (!params.id) return;
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${params.id}/similar?language=en-US&page=1`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      setSimilarMovies(response.data.results as SimilarMovie[]);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getMovieData();
      getSimilarMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, TMDB_BASE_URL, TMDB_API_TOKEN]);

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
    <div className="w-full flex justify-center">
      <div className="max-w-[1080px] flex flex-col justify-center">
        <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0 w-full">
          <div className="text-2xl font-bold lg:text-4xl">
            <h1>{movieData.title}</h1>
            <p className="text-sm lg:text-lg">
              Runtime: {movieData.runtime} minutes | {movieData.release_date}
            </p>
          </div>
          <div className="text-xs flex items-center gap-x-1">
            <Star className="text-yellow-500" />
            {movieData.vote_average} / 10
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-x-6 w-full">
          <div className="hidden lg:block w-[290px] h-[428px] rounded overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              width={290}
              height={428}
              className="w-full h-auto rounded-lg shadow-xl object-cover"
              priority
            />
          </div>
          <div className="relative w-[375px] lg:w-[760px] h-[211px] lg:h-[428px]">
            {trailerKey && (
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        <div className="space-y-5 mb-5">
          <div className="flex flex-wrap gap-3 my-4">
            {movieData.genres.map((genre, index) => (
              <p
                key={genre.id || index}
                className="border px-2.5 py-0.5 text-xs rounded-full"
              >
                {genre.name}
              </p>
            ))}
          </div>
        </div>
        <p className="text-lg  mb-6">{movieData.overview}</p>
        <div className="space-y-3 text-foreground mb-8">
          <div className="flex space-x-3">
            <h4 className="font-bold">Director:</h4>
            <p>{director || "N/A"}</p>
          </div>
          <div className="flex space-x-3">
            <h4 className="font-bold">Writers:</h4>
            <p>{writers.length > 0 ? writers.join(", ") : "N/A"}</p>
          </div>
          <div className="flex space-x-3">
            <h4 className="font-bold">Stars:</h4>
            <p>{stars.length > 0 ? stars.join(", ") : "N/A"}</p>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">More like this</h2>
            <Button
              onClick={() => push(`/similar/${params.id}`)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2"
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
          <div className="flex flex-wrap gap-5 lg:gap-8 justify-center ">
            {similarMovies.slice(0, 4).map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                index={movie.id}
                path={movie.poster_path}
                vote={movie.vote_average}
                onclick={() => push(`/detail/${movie.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
