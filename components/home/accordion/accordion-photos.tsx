import React from 'react'
import Image from 'next/image'


const photos = [
  {
    "title": "Moldova, 2024",
    "url": "/DSCF3848.jpg"
  },
  {
    "title": "Italy, 2024",
    "url": "/DSCF3063.jpg"
  },
  {
    "title": "Romania, 2025",
    "url": "/DSCF4236.jpg"
  },
  {
    "title": "Georgia, 2026",
    "url": "/DSCF5091.jpg"
  },
  {
    "title": "Estonia, 2026",
    "url": "/DSCF4809.jpg"
  },
  {
    "title": "Romania, 2025",
    "url": "/DSCF4299.jpg"
  },
]


const AccordionPhotos = () => {
  return (
    <div className="w-auto h-screen flex flex-row justify-start place-items-center gap-5">
      {photos.map((photo, i) => {
        return (
          <div key={i} className='w-100 h-2/3 shadow-md  '> 
            <Image className='grayscale zoom-75 hover:filter-none hover:zoom-100 duration-300 w-full h-full' alt='photo' src={photo.url} width={0} height={0} sizes="100vw" />
            <p className='mt-2 font-medium' >{photo.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default AccordionPhotos