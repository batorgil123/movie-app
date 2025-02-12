"use client";
import React from "react";
import { Film } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  return (
    <footer className=" bg-indigo-700 py-10 px-5 text-sm text-[#fafafa]">
      <div className="flex flex-row justify-between gap-y-7   max-md:flex-col max-md:justify-between">
        <div className="space-y-3 flex flex-col">
          <div className="space-x-3 flex   flex-row items-center ">
            {" "}
            <Film />
            <h4 onClick={() => router.replace("/")} className="italic font-bold cursor-pointer">Movie Z</h4>
          </div>

          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-x-12 lg:gap-x-24 flex-row">
          <div className="space-y-3">
            <h4>Contact Information</h4>
            <div className="flex items-center gap-x-3">
              <Mail />
              <div>
                <h5 className="font-medium">Email</h5>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <Phone />
              <div>
                <h5 className="font-medium">Phone</h5>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="space-y-3"></div>
          <div className="space-y-3">
            <h4>Follow us</h4>
            <div className="flex max-lg:flex-col gap-3 lg:flex-row">
              <a className="font-medium">Facebook</a>
              <a className="font-medium">Instagramm</a>
              <a className="font-medium">Twitter</a>
              <a className="font-medium">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
