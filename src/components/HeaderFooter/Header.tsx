import React from "react";
import { Film, Moon, Sun } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const Header = () => {
  return (
    <div className=" h-[59px] bg-background flex items-center justify-center ">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film />
          <h4 className="italic font-bold">Movie Z</h4>
        </div>

        <div className="max-lg:flex max-lg:items-center gap-x-3 lg:hidden">
          <Button>
            <Search />
          </Button>
          <Button>
            <Moon />
          </Button>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-x-3 lg:items-center ">
          <Button className=""> genre
            </Button>
          <div className="relative text-muted-foreground w-[379px] flex items-center rounded-md" >
            <Search className="absolute left-[10px] opacity-[0.5]"
              size={20}
            />
            <Input className="w-full rounded-md pl-10 text-[#71717A]" type="text" placeholder="Search for movies" ></Input>
          </div>
        </div>
        <Button className="hidden lg:flex">
          <Moon />
        </Button>
      </div>
    </div>
  );
};
export default Header;
