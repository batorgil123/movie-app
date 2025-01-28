import React from "react";
import { Film, Moon } from "lucide-react";
import { Search } from "lucide-react";
import { MoonIcon, Sun } from "lucide-react";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <div className="fixed top-0 inset-x-0 z-20 h-[59px] bg-background flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film />
          <h4 className="italic font-bold">Movie Z</h4>
        </div>

        <div className="flex items-center gap-x-3">
          <Search />
          <Moon />
        </div>
      </div>
    </div>
  );
};
export default Header;
