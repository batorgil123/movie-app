import React from "react";
import { Film } from "lucide-react";
import { Button } from "../ui/button";
import {Mail} from "lucide-react"
const Footer = () => {
  return (
    <footer className="bg-indigo-700 py-10 px-5 text-sm text-[#fafafa]">
      <div className="mx-auto flex flex-col justify-between gap-y-7 lg:flex-row max-w-screen-xl">
        <div className="space-y-3">
          <Film />
          <h4 className="italic font-bold">Movie Z</h4>
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-x-12 lg:gap-x-24">
          <div className="space-y-3">
            <h4>Contact Information</h4>
            <div className="flex items-center gap-x-3">
                <Mail/>
              <div>
                <h5 className="font-medium">Email</h5>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
                <Mail/>
              <div>
                <h5 className="font-medium">Email</h5>
                <p>support@movieZ.com</p>
              </div>
            </div>
          </div>
          <div className="space-y-3"></div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
