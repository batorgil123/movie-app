"use client";

import React, { useState } from "react";
import { Film, Moon, Sun, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Genre from "../fetchgenres";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showGenres, setShowGenres] = useState(false);

  return (
    <div className="h-[59px] bg-background flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film />
          <div
            onClick={() => router.replace("/")}
            className="italic font-bold cursor-pointer"
          >
            Movie Z
          </div>
        </div>

        <div className="hidden max-lg:flex max-lg:items-center gap-x-3">
          <Search className="text-muted-foreground opacity-[0.4]" size={20} />
          <Button
            className="rounded-[5px] shadow-none border-none border-[#F4F4F4] focus:border-[#9c9898]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className="hidden relative lg:flex lg:justify-center lg:gap-x-3 lg:items-center">
          <div className="relative group">
            <Button onClick={() => setShowGenres(!showGenres)} className="border border-gray-700 rounded-[5px]">
              Genre
            </Button>
            {showGenres && (
              <div
                className="absolute w-[540px] left-0 mt-2 rounded-[10px] bg-gray-800 bg-opacity-90 text-white p-4 shadow-lg z-20 group-hover:scale-100 transition-all duration-200"
              >
                <Genre />
              </div>
            )}
            
          </div>

          <div className="relative text-muted-foreground w-[379px] flex items-center border-none">
            <Search className="absolute left-[10px] opacity-[0.4]" size={20} />
            <Input
              className="w-full pl-10 rounded-[8px] border border-[#F4F4F4] focus:border-[#9c9898] placeholder-opacity-[0.2]"
              type="text"
              placeholder="Search for movies"
            />
          </div>
        </div>

        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hidden lg:flex shadow-none  rounded-[5px] border border-[#F4F4F4] focus:border-[#9c9898]"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </div>
  );
};

export default Header;
