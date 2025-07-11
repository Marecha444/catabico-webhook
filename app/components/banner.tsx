import Image from "next/image"

export default function Banner() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <Image
          src="/images/outdoor01b.webp"
          alt="Jadlog Pickup - Uma opção prática e conveniente"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  )
}
