import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const photos = [
  {
    title: "Moldova, 2024",
    url: "/DSCF3848.jpg",
  },
  {
    title: "Georgia, 2026",
    url: "/DSCF5091.jpg",
  },
  {
    title: "Estonia, 2026",
    url: "/DSCF4809.jpg",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4299.jpg",
  },
];

const AccordionPhotos = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-auto pt-15 flex gap-5">
        {photos.map((photo, i) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeOut", delay: i * 0.15 }}
              key={i}
              className="w-100 h-140 shadow-md relative "
            >
              <Image
                className="grayscale hover:filter-none duration-300 w-full h-full"
                alt="photo"
                src={photo.url}
                width={0}
                height={0}
                sizes="100vw"
              />
              <p className="mt-2 font-medium">{photo.title}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center mt-15">
        <Link href="/photos">
          <Button className="text-lg py-5 px-4 box-border cursor-pointer text-md rounded-xl">
            Check my photography...
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccordionPhotos;
