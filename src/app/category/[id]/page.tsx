import React from "react";
import Popular from "@/components/Popular";
const Page = ({ params }: { params: { p: string } }) => {
  const { p } = params;
console.log("param",p);

  return (
      <div></div>
  );
};

export default Page;
