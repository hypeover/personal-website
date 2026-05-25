import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";
import { Mousewheel, Navigation } from "swiper/modules";
import 'swiper/css/navigation';

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
  {
    title: "Italy, 2025",
    url: "/DSCF3063.jpg",
  },
  {
    title: "Romania, 2025",
    url: "/DSCF4236.jpg",
  },
];

const AccordionPhotos = () => {
  return (
    <div className="h-screen w-full pl-10 pr-9 pt-15">
      <Swiper
        className="w-full"
        spaceBetween={40}
        slidesPerView="auto"
        speed={800}
        mousewheel={{
          enabled: true,
          releaseOnEdges: true,
          sensitivity: 1,
        }}
        loop={true}
        modules={[Mousewheel]}
      >
        {photos.map((photo, i) => {
          return (
            <SwiperSlide className="max-w-100" key={i}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeOut", delay: i * 0.15 }}
                key={i}
                className="w-100 h-150 flex flex-col"
              >
                <div className="w-100 h-140 overflow-hidden">
                  <Image
                    className="grayscale hover:filter-none duration-300 w-full h-full object-cover shadow-md"
                    alt={photo.title}
                    loading="eager"
                    src={photo.url}
                    width={500}
                    height={700}
                  />
                </div>
                <p className="mt-2 font-medium">{photo.title}</p>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AccordionPhotos;

