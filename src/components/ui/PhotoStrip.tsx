import Image from 'next/image'

type Photo = {
  src: string
  alt: string
  position?: string
}

type Props = {
  photos: Photo[]
  className?: string
}

export default function PhotoStrip({ photos, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
      {photos.map((photo) => (
        <div key={photo.src} className="overflow-hidden rounded-2xl">
          <div className="relative aspect-[4/3]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              className={`object-cover ${photo.position ?? 'object-center'}`}
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
