"use client";
import { useLoading } from "./loading-context";
import Footer from "./HeaderFooter/Footer";

export default function ConditionalFooter() {
  const { isLoading } = useLoading();
  
  // Don't show footer when loading
  if (isLoading) {
    return null;
  }
  
  return <Footer />;
}
