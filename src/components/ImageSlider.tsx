"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarIcon from "@/app/icons/star";
import { Movie } from "./types";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
interface ImageSliderProps {
  element: Movie[];
}
const TMDB_IMAGE_SERVICE = process.env.TMDB_IMAGE_SERVICE || "https://image.tmdb.org/t/p";
const ImageSlider: React.FC<ImageSliderProps> = ({ element }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500 }}
      loop
      speed={1000}
      className="w-full  rounded-lg overflow-hidden flex flex-wrap"
    >
      {element.map((data, index) => (
        <SwiperSlide key={index}>
          <img
            src={`${TMDB_IMAGE_SERVICE}/original/${data.backdrop_path}`}
            alt={`Slide ${index + 1}`}
            className="w-full h-[600px] object-cover "
          />
          <div className="lg:absolute p-3 top-[25%] left-[5%] bg-black bg-opacity-0 text-white rounded-[15px] flex flex-col items-start gap-4 w-[404px] h-auto">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="line-clamp-4">{data.overview}</p>
            <div className="flex gap-2">
              <StarIcon />
              <span>{data.vote_average}</span>
            </div>
            <Button className="flex bg-black rounded-[5px]">
              <Play /> Watch Trailer
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
