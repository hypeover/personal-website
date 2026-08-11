import Link from "next/link";
import PhotoCarousel from "@/components/photography/photo-carousel";

const Page = () => {
  return (
    <div className="relative w-full">
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
      <PhotoCarousel />
    </div>
  );
};

export default Page;
