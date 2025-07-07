"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarIcon from "@/app/icons/star";
import { Movie } from "./types";
import { Button } from "./ui/button";
import { Play, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";

interface ImageSliderProps {
  element: Movie[];
}

const TMDB_IMAGE_SERVICE = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE || "https://image.tmdb.org/t/p";
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

const ImageSlider: React.FC<ImageSliderProps> = ({ element }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchTrailer = async (movieId: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      const trailers = response.data.results as { type: string; site: string; key: string }[];
      const officialTrailer = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailerKey(officialTrailer ? officialTrailer.key : null);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        speed={1000}
        className="w-full rounded-lg overflow-hidden flex flex-wrap"
      >
        {element.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] md:h-[600px]">
              <Image
                src={`${TMDB_IMAGE_SERVICE}/original${data.backdrop_path}`}
                alt={data.title}
                fill
                className="object-cover rounded-lg cursor-pointer"
                onClick={() => fetchTrailer(data.id)}
                priority
              />
              <div className="absolute p-3 top-[25%] left-[5%] bg-opacity-60 text-black lg:text-white rounded-lg flex flex-col items-start gap-4 w-[404px] h-auto">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className="line-clamp-4">{data.overview}</p>
                <div className="flex gap-2 items-center">
                  <StarIcon />
                  <span>{data.vote_average.toFixed(1)}</span>
                </div>
                <Button
                  className="flex items-center gap-2 bg-red-600 rounded-[5px] px-4 py-2"
                  onClick={() => fetchTrailer(data.id)}
                >
                  <Play /> Watch Trailer
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trailer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
          <div className="relative w-[80%] max-w-[900px] bg-black rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-900 rounded-full p-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
            {trailerKey ? (
              <iframe
                className="w-full h-[500px] rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-white text-center p-10">
                <p>No trailer available.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
