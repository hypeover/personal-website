"use client";

import Link from "next/link";
import PhotoCarousel from "@/components/photography/photo-carousel";
import ThemeToggle from "@/components/home/home-items/mode-toggle";

const Page = () => {
  return (
    <div className="relative w-full overflow-x-hidden scrollbar-none">
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
      <div className="fixed bottom-5 left-5 z-50">
        <ThemeToggle />
      </div>
      <PhotoCarousel />
    </div>
  );
};

export default Page;