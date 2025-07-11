import Image from "next/image"

export default function BannerAlt() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        <Image
          src="/images/outdoor_servicos.webp"
          alt="Conheça os produtos e serviços da Jadlog"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
    </div>
  )
}
