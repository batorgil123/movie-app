import React from "react";
import Popular from "@/components/Popular";
import TopRated from "@/components/TopRated";
import Upcoming from "@/components/Upcoming";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      {id === "popular" && <Popular />}
      {id === "toprated" && <TopRated />}
      {id === "upcoming" && <Upcoming />}
    </>
  );
};

export default Page;
